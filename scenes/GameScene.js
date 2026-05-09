import { Scene, manager } from "@tialops/maki";

export default class GameScene extends Scene {
  // config
  caractereSpeed = 200;
  flowerCollected = 0;

  // si le message est affiché ou pas
  isMessageDisplayed = false;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    super.preload();

    // load player sprite and map assets (default by makijs)
    this.lia = this.maki.player("lia");
    manager.map(this, "default_map");
    manager.preload(this);

    // charger les images
    this.loadImages();

    // charger les sons
    this.loadSounds();
  }

  create() {
    super.create();
    manager.create(this);

    // Place lia in the center of the map (50×50 tiles × 16px = 800×800)
    this.lia.sprite.setPosition(400, 490);
    this.lia.sprite.setSize(25, 45);
    this.lia.sprite.body.setOffset(4, 20);
    this.lia.speed = this.caractereSpeed;

    this.physics.add.collider(
      this.lia.sprite,
      manager.getWallGroup(this, "default_map")
    );

    // ajouter les murs de la map et les objets
    this.addLakoro();
    this.placeRandomObject();

    // jouer la musique de fond
    this.musicBackground = this.sound.add("stepOneBackgroungSong", {
      loop: true,
    });
    this.musicBackground.play();

    // effet click boutton
    this.pickupSong = this.sound.add("pickupSong", {
      loop: false,
    });

    // effet popup
    this.popupSong = this.sound.add("popupSong", {
      loop: false,
    });

    // show message to the player to go to the
    this.afficherMessage(
      `Bienvenue Bob! \nPartons ensemble à collecter les 7 fleurs 🌸 dispersées dans LAKORO, Utilisez les flèches du clavier pour me déplacer!`,
      "C'est parti!"
    );

    // charger les touches pour le déplacement
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.isMessageDisplayed === false) {
      this.maki.move(this.lia);
    }
    if (this.cursors.space.isDown) {
      // espace
      this.lia.speed = 300;
    }
    if (this.cursors.space.isUp) {
      // espace
      this.lia.speed = 200;
    }
  }

  /**
   * draw the walls of the map
   */
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

    this.physics.add.collider(this.lia.sprite, this.plants);
  }

  loadImages() {
    // random
    this.load.image("plants", "assets/random/plants.png");
    this.load.image("flower", "assets/random/flower.png");

    // bedroom
    this.load.image("bed", "assets/bedroom/bed.png");
    this.load.image("chair", "assets/bedroom/chair.png");
    this.load.image("chairleft", "assets/bedroom/chairleft.png");
    this.load.image("chairright", "assets/bedroom/chairright.png");
    this.load.image("desk", "assets/bedroom/desk.png");
    this.load.image("doll", "assets/bedroom/doll.png");
    this.load.image("lamp", "assets/bedroom/lamp.png");
    this.load.image("mirror", "assets/bedroom/mirror.png");
    this.load.image("queenbed", "assets/bedroom/queenbed.png");
    this.load.image("twobed", "assets/bedroom/twobed.png");

    // kitchen
    this.load.image("food", "assets/kitchen/food.png");
    this.load.image("grape", "assets/kitchen/grape.png");
    this.load.image("lemon", "assets/kitchen/lemon.png");
    this.load.image("strawberry", "assets/kitchen/strawberry.png");
  }

  loadSounds() {
    this.load.audio("stepOneBackgroungSong", "assets/song/step-1.mp3");
    this.load.audio("clickSong", "assets/song/click.mp3");
    this.load.audio("popupSong", "assets/song/popup.mp3");
    this.load.audio("pickupSong", "assets/song/pick-up.mp3");
  }

  placeRandomObject() {
    this.objectInRandom = this.physics.add.staticGroup();
    // clainst les objets dans la map
    this.objectToClain = this.physics.add.staticGroup();

    // lit deux place
    this.placeObject(235, 210, "queenbed", 32, 32, -Math.PI / 2);

    // placer la table et les fruit
    this.placeObject(225, 300, "desk", 32, 25);
    this.placeObject(215, 290, "lemon", 15, 25);
    this.placeObject(225, 290, "grape", 15, 25);
    this.placeObject(235, 290, "strawberry", 15, 25);

    //placer la table a manger
    this.placeObject(335, 370, "chairleft", 20);
    this.placeObject(305, 360, "chair");
    this.placeObject(278, 370, "chairright", 20);
    this.placeObject(305, 360, "food");

    // placer les fleurs
    // 3 fleurs avec x < 235
    for (let i = 0; i < 3; i++) {
      const x = Phaser.Math.Between(50, 235);
      const y = Phaser.Math.Between(50, 550);

      this.placeObjectClain(x, y, "flower");
    }

    // 4 fleurs avec x > 500
    for (let i = 0; i < 4; i++) {
      const x = Phaser.Math.Between(500, 750);
      const y = Phaser.Math.Between(50, 550);

      this.placeObjectClain(x, y, "flower");
    }

    this.physics.add.collider(this.lia.sprite, this.objectInRandom);
    this.physics.add.collider(
      this.lia.sprite,
      this.objectToClain,
      this.hitObject,
      null,
      this
    );
  }

  placeObject(x, y, name, w = 32, h = 32, rotation = 0) {
    this.objectInRandom
      .create(x, y, name)
      .setSize(w, h)
      .setRotation(rotation)
      .setImmovable(true);
  }

  placeObjectClain(x, y, name, w = 32, h = 32, rotation = 0) {
    this.objectToClain
      .create(x, y, name)
      .setSize(w, h)
      .setRotation(rotation)
      .setImmovable(true);
  }

  hitObject(player, object) {
    this.pickupSong.play();

    object.destroy();
    this.flowerCollected++;

    if (this.flowerCollected === 7) {
      this.afficherMessage(
        "Félicitations! Vous avez collecté toutes les fleurs! 🌸",
        "Suivant"
      );
    }
  }

  afficherMessage(message, boutonText = "OK") {
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
