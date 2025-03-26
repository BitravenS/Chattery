import React from "react";
import Image from "next/image";

export default function BG({
  fadeOut,
}: {
  fadeOut: React.SetStateAction<boolean>;
}) {
  return (
    <>
      <video
        id="de107977-528e-99f1-3b3f-ccabe9a94c8a-video"
        className="absolute inset-0 w-full h-full object-cover -z-1"
        autoPlay
        loop
        style={{
          backgroundImage:
            'url("https://cdn.prod.website-files.com/67c64968be1fea8fa4d33c56%2F67c76652e567be775c26ecd5_0404bb4b-bf63-4509-9fbf-73e7e1326f14-poster-00001.jpg")',
          backgroundSize: "cover",
        }}
        muted
        playsInline
        data-wf-ignore="true"
        data-object-fit="cover"
      >
        <source
          src="https://cdn.prod.website-files.com/67c64968be1fea8fa4d33c56%2F67c76652e567be775c26ecd5_0404bb4b-bf63-4509-9fbf-73e7e1326f14-transcode.mp4"
          data-wf-ignore="true"
        />
        <source
          src="https://cdn.prod.website-files.com/67c64968be1fea8fa4d33c56%2F67c76652e567be775c26ecd5_0404bb4b-bf63-4509-9fbf-73e7e1326f14-transcode.webm"
          data-wf-ignore="true"
        />
      </video>
      {/* Corner images */}
      <Image
        src="/japanese-alpha1.png"
        alt="Top Left"
        className={`absolute top-4 left-4 size-10 invert transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        width={40}
        height={40}
      />
      <Image
        src="/japanese-alpha2.png"
        alt="Top Right"
        className={`absolute top-4 right-4 size-10 invert transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        width={40}
        height={40}
      />
      <Image
        src="/japanese-alpha3.png"
        alt="Bottom Left"
        className={`absolute bottom-4 left-4 size-10 invert transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        width={40}
        height={40}
      />
      <Image
        src="/japanese-alpha4.png"
        alt="Bottom Right"
        className={`absolute bottom-4 right-4 size-10 invert transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        width={40}
        height={40}
      />
    </>
  );
}
