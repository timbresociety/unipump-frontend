"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { BackgroundBeamsDemo } from "@/components/ui/title";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const placeholders = [
    "eg:$WOJAK",
    "eg:$COPIUM",
    "eg:$NGMI",
    "eg:$FOMO",
    "eg:$WAGMI",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    console.log("submitted");
    // debugger
    // router.push(`/meme/?name=${username}`);
  }
  return (
    <div className="max-h-screen pt-60 h-full overflow-hidden">

      <BackgroundBeamsDemo />
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default HomePage;
