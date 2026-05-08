import { Scene, manager } from "@tialops/maki";

export default class GameScene extends Scene {
  //  this.scene.start('lakoro');

  preload() {
    super.preload();

    // load player sprite and map assets (default by makijs)
    this.lia = this.maki.player("lia");
    manager.map(this, "default_map");
    manager.preload(this);

    // charger les images
    this.loadImages();
  }

  create() {
    super.create();
    manager.create(this);

    // Place lia in the center of the map (50×50 tiles × 16px = 800×800)
    this.lia.sprite.setPosition(400, 490);
    this.lia.sprite.setSize(25, 45);
    this.lia.sprite.body.setOffset(4, 20);
    this.lia.speed = 250;

    this.physics.add.collider(
      this.lia.sprite,
      manager.getWallGroup(this, "default_map")
    );

    // ajouter les murs de la map et les objets
    this.addLakoro();
    this.placeRandomObject();

    // charger les touches pour le déplacement
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.maki.move(this.lia);

    if (this.cursors.left.isDown || this.cursors.right.isDown) {
      this.plants.children.forEach((object) => {
        // if (object.body.touching.left) {
          console.log(object);
        // }
      });
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

    this.physics.add.collider(this.lia.sprite, this.plants);
  }

  loadImages() {
    // random
    this.load.image("plants", "assets/random/plants.png");

    // bedroom
    this.load.image("bed", "assets/bedroom/bed.png");
    this.load.image("chair", "assets/bedroom/chair.png");
    this.load.image("desk", "assets/bedroom/desk.png");
    this.load.image("doll", "assets/bedroom/doll.png");
    this.load.image("lamp", "assets/bedroom/lamp.png");
    this.load.image("mirror", "assets/bedroom/mirror.png");
    this.load.image("queenbed", "assets/bedroom/queenbed.png");
    this.load.image("twobed", "assets/bedroom/twobed.png");
  }

  placeRandomObject() {
    const objects = [
      "bed",
      "chair",
      "desk",
      "doll",
      "lamp",
      "mirror",
      "queenbed",
      "twobed",
    ];

    let x = this.scale.width - 48;
    let y = 32;
    let increment = 1;

    this.objectInRandom = this.physics.add.staticGroup();

    objects.forEach((object) => {
      this.objectInRandom
        .create(x, y + increment * 32, object)
        .setSize(32, 32)
        .setImmovable(true);
      increment++;
    });

    this.physics.add.collider(this.lia.sprite, this.objectInRandom);
  }
}
