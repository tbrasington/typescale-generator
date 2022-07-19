import {
  TypographyScaleValues,
  buildTypographyScales,
} from "@initiate-ui/typescale-generator";

export default function Docs() {
  console.log("Docs");

  const scale = buildTypographyScales({
    range: [-1, 0, 2],
    min: {
      width: 320,
      fontSize: 16,
      typeScale: TypographyScaleValues.MINOR_SECOND.value,
    },
    max: {
      width: 1440,
      fontSize: 20,
      typeScale: TypographyScaleValues.PERFECT_FOURTH.value,
    },
  });
  return (
    <div>
      <h1>Docs</h1>
      <pre>
        <code>{JSON.stringify(scale, null, "  ")}</code>
      </pre>
    </div>
  );
}
