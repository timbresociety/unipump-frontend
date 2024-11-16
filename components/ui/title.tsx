"use client";
import { InfiniteMovingCards } from "./infinite-moving-cards";
export const words = `Hook it like its HOT...`;

const testimonials = [
  {
    id: "0x1",
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    image: "https://pump.mypinata.cloud/ipfs/QmTw1LdqoGRVemZXC1KvC37uo5SJ2BbPLAFFmFmQry5d6Y?img-width=800&img-dpr=2&img-onerror=redirect",
    title: "A Tale of Two Cities",
  },
  {
    id: "0x2",
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    image:
      "https://pump.mypinata.cloud/ipfs/QmaW2yTUvxPaqRHgEBBmrwpydAC3zvMNSdrGL8ZVxx8KEq?img-width=128&img-dpr=2&img-onerror=redirect",
    title: "Hamlet",
  },
  {
    id: "0x3",
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    image:
      "https://pump.mypinata.cloud/ipfs/QmZoArgv2chKu6o8HevvtHFUvjfXuRre2VQ8s4nAXeN57R?img-width=128&img-dpr=2&img-onerror=redirect",
    title: "A Dream Within a Dream",
  },
  {
    id: "0x4",
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    image:
      "https://pump.mypinata.cloud/ipfs/QmfHqFSe6ztFxJQ3X4jubobefrSFhkU49CNhK9Z46MgP18?img-width=128&img-dpr=2&img-onerror=redirect",
    title: "Pride and Prejudice",
  },
  {
    id: "0x5",
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    image:
      "https://pump.mypinata.cloud/ipfs/QmeYgspFYwNC2qtmhyDQq3ygj42NBR2UZGZudSxsQDnFPV?img-width=128&img-dpr=2&img-onerror=redirect",
    title: "Moby-Dick",
  },
];

export function BackgroundBeamsDemo() {
  return (
    <div className="w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
      />
    </div>
  );
}
