import { Scene } from "@tialops/maki";

export default class StartupScene extends Scene {
  constructor() {
    super({ key: "Startup" });
  }

  preload() {
    // assets
    this.load.image("lakorobeFond", "assets/lakorobe/lakorobe.png");
    this.load.image("backgroundBamboo", "assets/lakorobe/backgroundBamboo.png");
    this.load.audio("popupSong", "assets/song/popup.mp3");
    this.load.audio("startup", "assets/song/startup1.mp3");

    this.load.spritesheet("maki-3", "assets/lakorobe/maki-3.png", {
      frameWidth: 480,
      frameHeight: 469,
    });

    this.load.spritesheet("litle-bamboo", "assets/lakorobe/litle-bamboo.png", {
      frameWidth: 335,
      frameHeight: 480,
    });

    this.load.spritesheet("bararata", "assets/lakorobe/bararata.png", {
      frameWidth: 480,
      frameHeight: 480,
    });

    this.load.spritesheet("feuille", "assets/lakorobe/feuille.png", {
      frameWidth: 480,
      frameHeight: 480,
    });

  }

  create() {
    this.backgroundBamboo = this.add.sprite(0, 0, "backgroundBamboo");
    this.backgroundBamboo.setPosition(this.scale.width / 2, this.scale.height / 2);
    this.backgroundBamboo.setScale(0.45);

    this.lakorobeFond = this.add
      .image(this.scale.width / 2, 0, "lakorobeFond")
      .setOrigin(0.5, 0);
    this.lakorobeFond.setScale(0.7);

    this.showAnimations("makiblue", "maki-3", this.scale.width / 2, this.scale.height + 40, 0, 40, 12);
    this.showAnimations("bamboo", "litle-bamboo", 20, this.scale.height, 0, 3, 3);
    this.showAnimations("bararata", "bararata", (2 * this.scale.width / 3) + 60, this.scale.height + 20, 0, 120, 11);
    this.showAnimations("feuille", "feuille", 0, this.scale.height / 2 - 80, 0, 5, 7);

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
      this.scene.start("TutorielScene");
    });
  }

  showAnimations(key, name, x, y, start = 0, end = 44, frameRate = 12) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers(name, {
        start: start,
        end: end,
      }),
      frameRate: frameRate,
      repeat: -1,
    });

    const anim = this.add.sprite(x, y, name);
    anim.setScale(0.5);
    anim.setOrigin(0, 1);
    anim.play(key);
  }

}
