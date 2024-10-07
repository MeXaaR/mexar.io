import Image from "next/image";

export const Mexar = ({ dark }: { dark?: boolean }) => {
  const color = dark ? "white" : "black";
  return (
    <div
      className="title"
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: "0px",
        marginTop: "0px",
        lineHeight: "40px",
      }}
    >
      <Image
        style={{ marginRight: 5 }}
        alt="logo"
        width={30}
        height={30}
        src={`/images/${dark ? "logo_white" : "logo_dark"}.png`}
      />
      <span style={{ color }}>mexar</span>
      <span className="orange">.</span>
      <span style={{ color }}>io</span>
    </div>
  );
};
