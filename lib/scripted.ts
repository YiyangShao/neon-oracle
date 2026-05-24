// Pre-written oracles used when the live Claude call is unavailable.
// Tone reference for the eventual real prompt: specific, picture-forward,
// declarative — never motivational, never AI-self-aware.

export const SCRIPTED: [string, string, string][] = [
  [
    "你在等一个不会来的回复。窗外的灯光闪了三次，你的手机却安静得像沉到水底的石头。",
    "你以为关上门就能解决，但门的另一侧站着的，是去年那个未被回答的自己。",
    "九月的最后一周，一个名字会重新出现在你的对话框里。你不会立刻回，但你会盯着它看很久。",
  ],
  [
    "你已经知道答案了。你只是在等一个比你更狠的人替你说出来。",
    "桌面上那杯咖啡凉了三次，你重新热了三次，你说服自己这不是逃避。",
    "下一次他递给你那个杯子的时候，你会看清杯底沉着什么。它一直在那。",
  ],
  [
    "你不在迷路。你只是不愿承认你已经走到了。",
    "城市在你身后塌下来的那一刻，你听见的是一阵安静。不是悲伤，是终于。",
    "周三凌晨两点四十一分，你会做一个梦。醒来后你会知道接下来该往哪里走。",
  ],
];

export function pickScripted(): [string, string, string] {
  return SCRIPTED[Math.floor(Math.random() * SCRIPTED.length)];
}
