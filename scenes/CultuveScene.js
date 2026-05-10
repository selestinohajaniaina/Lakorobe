import { Scene, manager } from "@tialops/maki";

export default class CultiveScene extends Scene {
  isMessageDisplayed = false;
  caractereSpeed = 100;
  yMin = 100;
  yMax = 500;

  constructor() {
    super({ key: "CultiveScene" });
  }

  preload() {
    super.preload();
    this.load.image("plants", "assets/random/plants.png");

    this.load.spritesheet("piggy", "assets/animal/piggy.png", {
      frameWidth: 268,
      frameHeight: 175,
    });

    this.load.spritesheet("mimi", "assets/animal/mimi.png", {
      frameWidth: 250,
      frameHeight: 199,
    });

    this.load.spritesheet("pigking", "assets/animal/pigking.png", {
      frameWidth: 250,
      frameHeight: 199,
    });

    // load player sprite and map assets (default by makijs)
    this.lia = this.maki.player("lia");
    manager.preload(this);
  }

  create() {
    super.create();
    manager.create(this);

    // Place lia in the center of the map (50×50 tiles × 16px = 800×800)
    this.lia.sprite.setPosition(50, 280);
    this.lia.sprite.setSize(25, 45);
    this.lia.sprite.body.setOffset(4, 20);
    this.lia.speed = this.caractereSpeed;

    // effet popup
    this.popupSong = this.sound.add("popupSong", {
      loop: false,
    });

    this.gardes = this.physics.add.group();
    this.physics.add.collider(
      this.lia.sprite,
      this.gardes,
      this.isTouched,
      null,
      this
    );

    this.addLakoro();

    // desssiner les lignes pour vitsily
    // ligne haut
    this.drawLine(100, this.yMin, 700, this.yMin, 0xedd500);
    // ligne milieu
    this.drawLine(100, 300, 700, 300);
    // ligne bas
    this.drawLine(100, this.yMax, 700, this.yMax, 0xedd500);
    // ligne premier
    this.drawLine(100, this.yMin, 100, this.yMax);
    // ligne deuxieme
    this.drawLine(250, this.yMin, 250, this.yMax);
    // ligne troisieme
    this.drawLine(400, this.yMin, 400, this.yMax);
    // ligne quatrieme
    this.drawLine(550, this.yMin, 550, this.yMax);
    // ligne cinquieme
    this.drawLine(700, this.yMin, 700, this.yMax);

    // garde au milieu
    this.piggy = this.showAnimations("piggy", "piggy", 90, 300, 0, 3, 8);
    this.piggy.setScale(0.2).setSize(150, 150);
    this.tweens.add({
      targets: this.piggy,
      x: 670,
      duration: 12000,
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        // regarde vers la gauche
        this.piggy.flipX = true;
      },
      onRepeat: () => {
        // regarde vers la droite
        this.piggy.flipX = false;
      },
    });

    this.mimi = this.showAnimations("mimi", "mimi", 650, 327, 0, 3, 8);
    this.mimi.setScale(0.4).setSize(70, 70);
    this.mimi.flipX = true;
    this.tweens.add({
      targets: this.mimi,
      x: 70,
      duration: 12000,
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        // regarde vers la gauche
        this.mimi.flipX = false;
      },
      onRepeat: () => {
        // regarde vers la droite
        this.mimi.flipX = true;
      },
    });

    // garde du premier
    this.pigkingFirst = this.showAnimations(
      "pigkingFirst",
      "pigking",
      55,
      550,
      0,
      3,
      8
    );
    this.pigkingFirst.setScale(0.4).setSize(70, 70);
    this.pigkingFirst.flipX = true;
    this.tweens.add({
      targets: this.pigkingFirst,
      y: 150,
      duration: 12000,
      yoyo: true,
      repeat: -1,
    });

    // garde du deuxieme
    this.pigkingSecond = this.showAnimations(
      "pigkingSecond",
      "pigking",
      205,
      150,
      0,
      3,
      8
    );
    this.pigkingSecond.setScale(0.4).setSize(70, 70);
    this.pigkingSecond.flipX = true;
    this.tweens.add({
      targets: this.pigkingSecond,
      y: 550,
      duration: 12000,
      yoyo: true,
      repeat: -1,
    });

    // garde du troisieme
    this.pigkingThird = this.showAnimations(
      "pigkingThird",
      "pigking",
      355,
      550,
      0,
      3,
      8
    );
    this.pigkingThird.setScale(0.4).setSize(70, 70);
    this.pigkingThird.flipX = true;
    this.tweens.add({
      targets: this.pigkingThird,
      y: 150,
      duration: 12000,
      yoyo: true,
      repeat: -1,
    });

    // garde du quatrieme
    this.mimiFourth = this.showAnimations(
      "mimiFourth",
      "mimi",
      505,
      150,
      0,
      3,
      8
    );
    this.mimiFourth.setScale(0.4).setSize(70, 70);
    this.mimiFourth.flipX = true;
    this.tweens.add({
      targets: this.mimiFourth,
      y: 550,
      duration: 12000,
      yoyo: true,
      repeat: -1,
    });

    // garde du cinquieme
    this.pigkingFifth = this.showAnimations(
      "pigkingFifth",
      "pigking",
      655,
      550,
      0,
      3,
      8
    );
    this.pigkingFifth.setScale(0.4).setSize(70, 70);
    this.pigkingFifth.flipX = true;
    this.tweens.add({
      targets: this.pigkingFifth,
      y: 150,
      duration: 12000,
      yoyo: true,
      repeat: -1,
    });

    this.afficherMessage(
      "Heureux de te revoir Champion!\n\nPrêt à explorer le VITSILY 😃 ?\nLes règles sont simples :\n• Évite les gardes\n• Ne touche pas les lignes jaunes\n• Ne retourne pas dans la case derrière toi\n\nNotre objectif est d'atteindre la sortie tout au fond… puis revenir ici.",
      "C'est parti !"
    );

    // charger les touches pour le déplacement
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.isMessageDisplayed === false) {
      this.maki.move(this.lia);
    }
  }

  addLakoro() {
    this.plants = this.physics.add.staticGroup();
    for (let i = 16; i < this.scale.width; i += 16) {
      for (let j = 16; j < this.scale.height; j += 32) {
        if (
          i === 16 ||
          i === this.scale.width - 16 ||
          j === 16 ||
          j >= this.scale.height - 32
        ) {
          this.plants.create(i, j, "plants").setSize(32, 32).setImmovable(true);
        }
      }
    }

    this.plants.create(100, 70, "plants").setSize(32, 32).setImmovable(true);
    this.plants.create(100, 540, "plants").setSize(32, 32).setImmovable(true);
    this.plants.create(700, 70, "plants").setSize(32, 32).setImmovable(true);
    this.plants.create(700, 540, "plants").setSize(32, 32).setImmovable(true);

    this.physics.add.collider(this.lia.sprite, this.plants);
  }

  drawLine(x1, y1, x2, y2, color = 0xffffff, width = 4) {
    const graphics = this.add.graphics();
    graphics.lineStyle(width, color, 1);
    graphics.beginPath();
    graphics.moveTo(x1, y1);
    graphics.lineTo(x2, y2);
    graphics.strokePath();
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

    const anim = this.gardes.create(x, y, name);
    anim.setOrigin(0, 1);
    anim.play(key);
    return anim;
  }

  isTouched(player, object) {
    this.afficherMessage(
      "Mooooooort!\nOn as touché par un garde !",
      "Recommencer",
        () => { this.resume(); }
    );
    // stop physique du joueur
    // this.lia.sprite.setVelocity(0, 0);
    this.lia.sprite.body.enable = false;

    // stop animations
    this.anims.pauseAll();
    // this.tweens.pauseAll();
    this.physics.pause();
  }

  resume() {
    this.lia.sprite.body.enable = true;
    this.anims.resumeAll();
    // this.tweens.resumeAll();
    this.physics.resume();

    // remettre le joueur au début
    this.lia.sprite.setPosition(50, 280);
  }
    // remettre les gardes à leur position initiale

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
