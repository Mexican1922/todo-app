import { useEffect, useRef, useState } from "react";
import type { Task } from "../types";

function playAlarmSound() {
  try {
    const audioContextConstructor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new audioContextConstructor();

    [0, 0.35, 0.7, 1.05, 1.4].forEach((startTime) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime + startTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + startTime + 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gain.gain.linearRampToValueAtTime(
        0.5,
        ctx.currentTime + startTime + 0.01,
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + startTime + 0.28,
      );

      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + 0.28);
    });
  } catch (e) {
    console.warn("Audio not supported", e);
  }
}

export function useAlarm(tasks: Task[], markAlarmFired: (id: number) => void) {
  const [ringingTask, setRingingTask] = useState<Task | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const current = `${hh}:${mm}`;

      for (const task of tasks) {
        if (task.alarm === current && !task.done && !task.alarmFired) {
          markAlarmFired(task.id);
          setRingingTask(task);
          playAlarmSound();

          // Also try a browser notification (user must allow it)
          if ("Notification" in window) {
            Notification.requestPermission().then((perm) => {
              if (perm === "granted") {
                new Notification("⏰ Task Reminder", {
                  body: task.text,
                  icon: "/favicon.svg",
                });
              }
            });
          }
          break;
        }
      }
    };

    check();
    intervalRef.current = setInterval(check, 10_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tasks, markAlarmFired]);

  const dismissAlarm = () => setRingingTask(null);

  return { ringingTask, dismissAlarm };
}
