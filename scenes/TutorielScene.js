import { Scene, manager } from "@tialops/maki";

export default class TutorielScene extends Scene {
  constructor() {
    super({ key: "TutorielScene" });
  }

  preload() {
  }

  create() {
    this.backgroundBamboo = this.add.sprite(0, 0, "backgroundBamboo");
    this.backgroundBamboo.setPosition(this.scale.width / 2, this.scale.height / 2);
    this.backgroundBamboo.setScale(0.45);

    this.showAnimations("bamboo1", "litle-bamboo", 20, this.scale.height, 0, 3, 3);
    this.showAnimations("bararata1", "bararata", (2 * this.scale.width / 3) + 60, this.scale.height + 20, 0, 120, 11);
    this.showAnimations("feuille1", "feuille", 0, this.scale.height / 2 - 80, 0, 5, 7);

    this.popupSong = this.sound.add("popupSong", {
      loop: false,
    });

    this.startupSong = this.sound.add("startup", {
      loop: true,
    });

    this.afficherMessage("Bienvenue Champion !\n\nDécouvre Lakorobe, un monde magique inspiré de Madagascar 🇲🇬, où la nature et les animaux vivent en harmonie à travers une grande aventure.", "Suivant >", () => {this.expliquerControles()});
  }

  expliquerControles() {
    this.afficherMessage("Voici Lia, ta companion dans cette aventure!\n\nUtilise les flèches directionnelles (↑ ↓ ← →) pour la déplacer.", "J'ai compris", () => {
     this.scene.start("GameScene");
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

    afficherMessage(message, boutonText = "OK", callback = null) {
    this.popupSong.play();
    this.isMessageDisplayed = true;
    // Texte
    const text = this.add
      .text(400, 260, message, {
        fontSize: "14px",
        color: "#222",
        backgroundColor: "#fff",
        padding: { left: 20, right: 20, top: 12, bottom: 60 },
        align: "left",
        wordWrap: {
          width: 280,
        },
      })
      .setOrigin(0.5)
      .setAlpha(0);

    const spacing = -50;

    const button = this.add
      .text(400, text.y + text.height / 2 + spacing + 20, boutonText, {
        fontSize: "14px",
        color: "#fff",
        backgroundColor: "#4caf50",
        padding: { x: 20, y: 12 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setAlpha(0);

    // Animation
    this.tweens.add({
      targets: [text, button],
      alpha: 1,
      y: "-=20",
      duration: 400,
      ease: "Power2",
    });

    // Clique bouton
    button.on("pointerdown", () => {
      this.popupSong.play();
      this.tweens.add({
        targets: [text, button],
        alpha: 0,
        duration: 300,
        onComplete: () => {
          text.destroy();
          button.destroy();
          this.isMessageDisplayed = false;
          if (callback) {
            callback();
          }
        },
      });
    });

    // Hover
    button.on("pointerover", () => {
      button.setBackgroundColor("#5bf860");
    });

    button.on("pointerout", () => {
      button.setBackgroundColor("#4caf50");
    });
  }

}
