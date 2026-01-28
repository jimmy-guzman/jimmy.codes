interface OgImageProps {
  title: string;
  coverImage?: string;
  logo?: string;
}

const colors = {
  background: "#1a1a1a",
  text: "#efefef",
};

export default function OgImage({ title, coverImage, logo }: OgImageProps) {
  return (
    <div
      style={{
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      {coverImage && (
        <img
          src={coverImage}
          alt=""
          style={{
            height: "100%",
            left: 0,
            objectFit: "cover",
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />
      )}

      <div
        style={{
          background:
            "linear-gradient(to bottom, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 0.85) 60%, rgba(26, 26, 26, 0.95) 100%)",
          bottom: 0,
          height: "85%",
          left: 0,
          position: "absolute",
          right: 0,
        }}
      />

      <div
        style={{
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          left: 0,
          padding: "64px 80px",
          position: "absolute",
          right: 0,
        }}
      >
        <div
          style={{
            color: colors.text,
            fontFamily: "JetBrains Mono",
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: 900,
            wordBreak: "break-word",
          }}
        >
          {title}
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 16,
          }}
        >
          {logo && (
            <img
              src={logo}
              alt=""
              style={{
                filter: "brightness(0) invert(1)",
                height: 40,
                width: 40,
              }}
            />
          )}
          <div
            style={{
              color: colors.text,
              fontFamily: "JetBrains Mono",
              fontSize: 28,
              fontWeight: 400,
              opacity: 0.8,
            }}
          >
            jimmy.codes
          </div>
        </div>
      </div>
    </div>
  );
}
