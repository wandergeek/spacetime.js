const colorMap: any = { "black": "0", "brown": "1", "red": "2", "orange": "3", "yellow": "4", "green": "5", "blue": "6", "violet": "7", "grey": "8", "white": "9" };

export class ResistorColor {
  private colors: string[];

  constructor(colors: string[]) {
    if (colors.length < 2) {
      throw "At least two colors need to be present"
    }
    this.colors = colors;
  }
  value = (): number => {
    return Number(colorMap[this.colors[0]] + colorMap[this.colors[1]])
  }
}
