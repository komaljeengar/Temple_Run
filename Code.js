let gl;
let dir = { x: 0, y: 0, z: -1 };
let camera_dir;

let ud_path = [Box, slope_ud, slope_ud2, half_ud, half_ud2];
let lr_path = [Box2, slope_lr, slope_lr2, half_lr, half_lr2];

let current_ground = Box0;
let prev_ground = [];
let coins = [];

addEventListener('keydown', (event) => {
    if (event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight') {
        camera_dir = Camera.getGazeDirection();
        if (Math.abs(camera_dir.z) > Math.abs(camera_dir.x)) {
            if (camera_dir.z < 0) {
                dir = { x: 0, y: 0, z: -1 };
            }
            else {
                dir = { x: 0, y: 0, z: 1 };
            }
        }
        else if (Math.abs(camera_dir.x) > Math.abs(camera_dir.z)) {
            if (camera_dir.x < 0) {
                dir = { x: -1, y: 0, z: 0 };
            }
            else {
                dir = { x: 1, y: 0, z: 0 };
            }
        }
    }
})

setup();

function setup() {
    gl = window.requestAnimationFrame(draw);
}
function draw() {
    addground();
    gl = window.requestAnimationFrame(draw);
}

function addground() {

    let d = checkground();
    let r = Math.random();
    let otc = Math.floor(Math.random() * lr_path.length);
    if (d) {
        for (let i = 0; i < 8; i++) {
            createCoins(d, r, otc, i);
        }
        if (d == 1 || d == 2) {
            otc = lr_path[otc];
            Hatch.cloneObject(otc, (co) => {
                //Hatch.log("ground created");
                co.setVisible(true);
                co.setRotationY(90);
                if (d == 1) {
                    co.setZ(current_ground.getZ() - 35);
                    if (r < 0.5) {
                        co.setX(current_ground.getX() - 45);
                    }
                    else {
                        co.setX(current_ground.getX() + 45);
                    }
                }
                else if (d == 2) {
                    co.setZ(current_ground.getZ() + 35);
                    if (r < 0.5) {
                        co.setX(current_ground.getX() - 45);
                    }
                    else {
                        co.setX(current_ground.getX() + 45);
                    }
                }
                prev_ground.push(current_ground);
                current_ground = co;
            })
        }
        else if (d == 3 || d == 4) {
            otc = ud_path[otc];
            Hatch.cloneObject(otc, (co) => {
                //Hatch.log("ground created");
                co.setVisible(true);
                if (d == 3) {
                    co.setX(current_ground.getX() + 35);
                    if (r < 0.5) {
                        co.setZ(current_ground.getZ() - 45);
                    }
                    else {
                        co.setZ(current_ground.getZ() + 45);
                    }
                }
                else if (d == 4) {
                    co.setX(current_ground.getX() - 35);
                    if (r < 0.5) {
                        co.setZ(current_ground.getZ() - 45);
                    }
                    else {
                        co.setZ(current_ground.getZ() + 45);
                    }
                }
                prev_ground.push(current_ground);
                current_ground = co;
            })
        }

        if (prev_ground.length > 2) {
            let otr = prev_ground.shift();
            Hatch.destroyObject(otr);
        }
    }
}

function checkground() {
    if (dir.x == -1) {
        if (current_ground.getX() - Player.getX() > 10) {
            return 4;
        }
    }
    else if (dir.x == 1) {
        if (Player.getX() - current_ground.getX() > 10) {
            return 3;
        }
    }
    else if (dir.z == 1) {
        if (Player.getZ() - current_ground.getZ() > 10) {
            return 2;
        }
    }
    else if (dir.z == -1) {
        if (current_ground.getZ() - Player.getZ() > 10) {
            return 1;
        }
    }
}


function createCoins(d, r, n, i) {
    Hatch.cloneObject(Cylinder, (coin) => {
        let xoff = 0;
        let yoff = 1.5;
        let zoff = 0;
        if (d == 1 || d == 2) {
            if (r < 0.5) {
                xoff = - 45 - 35 + 10 * i;
            }
            else {
                xoff = 45 - 35 + 10 * i;
            }

            if (d == 1) {
                zoff = -35;
            }
            else if (d == 2) {
                zoff = 35;
            }

            if (n == 1 && i > 1 && i < 6) {
                yoff += -5;
            }
            else if (n == 1 && (i == 1 || i == 6)) {
                yoff += -2.5;
            }
            else if (n == 2 && i > 1 && i < 6) {
                yoff += 5;
            }
            else if (n == 2 && (i == 1 || i == 6)) {
                yoff += 2.5;
            }

            if (n == 3 && i > 0 && i < 7) {
                zoff += 2.5;
            }
            else if (n == 4 && i > 0 && i < 7) {
                zoff += -2.5;
            }

        }
        else if (d == 3 || d == 4) {
            if (r < 0.5) {
                zoff = - 45 - 35 + 10 * i;
            }
            else {
                zoff = 45 - 35 + 10 * i;
            }

            if (d == 3) {
                xoff = 35;
            }
            else if (d == 4) {
                xoff = - 35;
            }

            if (n == 1 && i > 1 && i < 6) {
                yoff += -5;
            }
            else if (n == 1 && (i == 1 || i == 6)) {
                yoff += -2.5;
            }
            else if (n == 2 && i > 1 && i < 6) {
                yoff += 5;
            }
            else if (n == 2 && (i == 1 || i == 6)) {
                yoff += 2.5;
            }

            if (n == 3 && i > 0 && i < 7) {
                xoff += -2.5;
            }
            else if (n == 4 && i > 0 && i < 7) {
                xoff += 2.5;
            }
        }

        coin.setX(current_ground.getX() + xoff);
        coin.setY(current_ground.getY() + yoff);
        coin.setZ(current_ground.getZ() + zoff);
        coin.setVisible(true);

        coins.push(coin);
        coin.detectCollisionsWith(PlayerMarker, (pc) => {
            coins.splice(coins, 1);
            Hatch.destroyObject(coin);
        })
        if (coins.length > 16){
            coi = coins.shift();
            Hatch.destroyObject(coi);
        }
    })
}
