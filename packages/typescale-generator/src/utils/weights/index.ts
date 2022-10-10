export type WeightProps = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export function getWeightName(value: number) {
  let name = "Normal";
  const weights = {
    100: "Thin",
    200: "Extra Light",
    300: "Light",
    400: "Normal",
    500: "Medium",
    600: "Semi Bold",
    700: "Bold",
    800: "Extra Bold",
    900: "Black",
  };
  if (value in weights) {
    name = weights[value as WeightProps];
  }
  return name;
}

// 100	Thin (Hairline)
// 200	Extra Light (Ultra Light)
// 300	Light
// 400	Normal
// 500	Medium
// 600	Semi Bold (Demi Bold)
// 700	Bold
// 800	Extra Bold (Ultra Bold)
// 900	Black (Heavy)
