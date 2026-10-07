"""
make_music.py — generates a gentle, original music-box lullaby (A minor)
as a 16-bit stereo WAV, which ffmpeg then encodes to MP3.

This is a soft PLACEHOLDER track. Replace assets/music/birthday-song.mp3
with your own song (keep the same filename) whenever you like.

Pure standard library. Run:
    python tools/make_music.py out.wav
"""

import math
import wave
import sys
import array

SR = 44100
BPM = 72
BEAT = 60.0 / BPM          # 0.8333 s
BAR = 4 * BEAT

# Note frequencies (Hz)
FREQ = {
    "D2": 73.42, "E2": 82.41, "F2": 87.31, "G2": 98.00, "A2": 110.00, "C3": 130.81,
    "D4": 293.66, "E4": 329.63, "F4": 349.23, "G4": 392.00, "A4": 440.00, "B4": 493.88,
    "C5": 523.25, "D5": 587.33, "E5": 659.26, "F5": 698.46, "G5": 783.99, "A5": 880.00,
}

# Melody: (note, beats) — one full pass is 16 bars ≈ 53.3 s; played twice.
MELODY = [
    ("A4", 1), ("C5", 1), ("E5", 1), ("C5", 1),
    ("E5", 1), ("D5", 1), ("C5", 1), ("B4", 1),
    ("A4", 1), ("C5", 1), ("E5", 1), ("A5", 1),
    ("G5", 2), ("E5", 2),
    ("F4", 1), ("A4", 1), ("C5", 1), ("F5", 1),
    ("E5", 1), ("C5", 1), ("A4", 1), ("G4", 1),
    ("D4", 1), ("F4", 1), ("A4", 1), ("D5", 1),
    ("E5", 2), ("C5", 1), ("B4", 1),
    ("A4", 1), ("C5", 1), ("E5", 1), ("C5", 1),
    ("E5", 1), ("D5", 1), ("C5", 1), ("B4", 1),
    ("C5", 1), ("B4", 1), ("A4", 1), ("G4", 1),
    ("A4", 4),
]

# Bass root per bar (two passes)
BASS_PASS = ["A2", "A2", "A2", "G2",
             "F2", "C3", "D2", "E2",
             "A2", "F2", "C3", "A2",
             "A2", "F2", "C3", "A2"] * 2

TOTAL_BARS = len(BASS_PASS)
LEAD_IN = 2.5           # seconds of soft pad before the first note
TAIL = 4.0              # ringing tail before the fade


def render_note(buf, start, freq, dur, gain):
    """Music-box voice: sine + soft 2nd/3rd harmonic, fast attack, long decay."""
    n0 = int(start * SR)
    n_len = int((dur + 1.1) * SR)          # let it ring past its slot
    attack = int(0.008 * SR)
    tau = 0.85                              # decay time constant
    for n in range(n_len):
        i = n0 + n
        if i >= len(buf):
            break
        t = n / SR
        env = 1.0 - math.exp(-t / tau)
        if n < attack:
            env *= n / attack
        if t > dur:                          # gentle release after its slot
            env *= max(0.0, 1.0 - (t - dur) / 0.9)
        s = (math.sin(2 * math.pi * freq * t)
             + 0.26 * math.sin(2 * math.pi * 2 * freq * t)
             + 0.09 * math.sin(2 * math.pi * 3 * freq * t))
        buf[i] += gain * env * s


def render_bass(buf, start, freq, dur, gain):
    """Low pad: root + octave, slow edges."""
    n0 = int(start * SR)
    n_len = int(dur * SR)
    attack = int(0.5 * SR)
    release = int(0.5 * SR)
    for n in range(n_len):
        i = n0 + n
        if i >= len(buf):
            break
        t = n / SR
        env = 1.0
        if n < attack:
            env *= n / attack
        if n > n_len - release:
            env *= max(0.0, (n_len - n) / release)
        s = math.sin(2 * math.pi * freq * t) + 0.45 * math.sin(2 * math.pi * 2 * freq * t)
        buf[i] += gain * env * s


def main(out_path):
    melody_beats = sum(b for _, b in MELODY)
    duration = LEAD_IN + TOTAL_BARS * BAR + TAIL
    total = int(duration * SR)

    print(f"duration ~{duration:.1f}s, {total} samples")
    buf = array.array("d", [0.0]) * total

    # Pads, one per bar
    for bar in range(TOTAL_BARS):
        start = LEAD_IN + bar * BAR
        render_bass(buf, start, FREQ[BASS_PASS[bar]], BAR * 0.98, 0.045)

    # Melody, twice through; second pass a touch softer
    t_note = LEAD_IN
    for pass_idx in range(2):
        t_note = LEAD_IN + pass_idx * 16 * BAR
        for name, beats in MELODY:
            dur = beats * BEAT
            vel = 0.86 + 0.14 * ((t_note * 7.13) % 1.0)      # deterministic "human" touch
            gain = 0.16 * vel * (1.0 if pass_idx == 0 else 0.9)
            render_note(buf, t_note, FREQ[name], dur, gain)
            t_note += dur

    # Echo (one feedback tap) for a little air
    delay = int(0.42 * SR)
    wet = [0.0] * total
    for i in range(total):
        out = buf[i] + (wet[i - delay] if i >= delay else 0.0)
        wet[i] = out * 0.30
    for i in range(total):
        buf[i] += wet[i] * 0.9

    # One-pole lowpass to soften the highs
    fc = 3400.0
    a = 1.0 - math.exp(-2 * math.pi * fc / SR)
    prev = 0.0
    for i in range(total):
        prev += a * (buf[i] - prev)
        buf[i] = prev

    # Normalize, then fade in / out
    peak = max(abs(min(buf)), abs(max(buf))) or 1.0
    norm = 0.82 / peak
    fade_out_start = total - int(3.5 * SR)
    fade_in_end = int(0.4 * SR)
    for i in range(total):
        g = norm
        if i < fade_in_end:
            g *= i / fade_in_end
        if i > fade_out_start:
            g *= (total - i) / (total - fade_out_start)
        buf[i] *= g

    # Stereo with a tiny Haas offset on the right channel
    right_shift = int(0.00035 * SR)
    frames = bytearray()
    for i in range(total):
        j = i - right_shift if i >= right_shift else i
        l = max(-1.0, min(1.0, buf[i]))
        r = max(-1.0, min(1.0, buf[j]))
        frames += int(l * 32767).to_bytes(2, "little", signed=True)
        frames += int(r * 32767).to_bytes(2, "little", signed=True)

    with wave.open(out_path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(bytes(frames))
    print("wrote", out_path)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "song.wav")
