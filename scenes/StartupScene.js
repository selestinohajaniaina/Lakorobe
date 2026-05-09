import { Scene } from "@tialops/maki";

export default class StartupScene extends Scene {
  constructor() {
    super({ key: "Startup" });
  }

  preload() {
    // assets si besoin
    this.load.image("lakorobeFond", "assets/lakorobe/lakorobe.png");
    this.load.audio("popupSong", "assets/song/popup.mp3");
    this.load.audio("startup", "assets/song/startup.mp3");

  }

  create() {
    this.lakorobeFond = this.add
      .image(this.scale.width / 2, 0, "lakorobeFond")
      .setOrigin(0.5, 0);
    this.lakorobeFond.setScale(0.7);

    this.popupSong = this.sound.add("popupSong", {
      loop: false,
    });

    this.startupSong = this.sound.add("startup", {
      loop: true,
    });

    this.startupSong.play();

    const jouerBtn = this.add
      .text(this.scale.width / 2, 450, "▶ JOUER", {
        fontSize: "32px",
        fontStyle: "bold",
        color: "#ffffff",

        backgroundColor: "#4CAF50",

        padding: {
          left: 30,
          right: 30,
          top: 15,
          bottom: 15,
        },

        shadow: {
          offsetX: 3,
          offsetY: 3,
          color: "#000000",
          blur: 5,
          fill: true,
        },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    jouerBtn.on("pointerover", () => {
      jouerBtn.setScale(1.05).setBackgroundColor("#66BB6A");
    });

    jouerBtn.on("pointerout", () => {
      jouerBtn.setScale(1).setBackgroundColor("#4CAF50");
    });

    jouerBtn.on("pointerdown", () => {
      this.popupSong.play();
      this.scene.start("GameScene");
    });
    
  }
}
