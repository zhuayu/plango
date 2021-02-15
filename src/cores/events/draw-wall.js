import WallData from "../objects/Wall.js";
import * as THREE from "three";

class DrawWall {
  constructor() {}

  init() {
    this.currentWall = null;
    this.walls = [];
    this.mouseX = null;
    this.mouseY = null;
  }

  draw(mouseX, mouseY, type = 0) {
    if (!this.currentWall) {
      this.buildFirstWall(mouseX, mouseY, type);
      return;
    }
  }

  buildFirstWall(mouseX, mouseY, type = 0) {
    const point = this.checkPositionOnLine(mouseX, mouseY);
    this.mouseX = point ? point.x : mouseX;
    this.mouseY = point ? point.y : mouseY;
    this.currentWall = new WallData();
    this.currentWall.OnInit(this.mouseX, this.mouseY, type);
  }

  checkPositionOnLine(posX, posY) {
    for (let i = 0; i < this.walls.length; i++) {
      let point = this.ClosestPointOnLine(
        this.walls[i],
        posX,
        posY,
        0,
        this.walls[i].m_fWidth / 2
      );
      if (point) {
        return point;
      }
    }
  }

  /***
   * 点是否在线段上
   *
   */

  ClosestPointOnLine(pWallLine, x1, y1, z1, fDis) {
    let point = null;
    if (
      Math.abs(x1 - pWallLine.m_vStart.x) < fDis &&
      Math.abs(y1 - pWallLine.m_vStart.y) < fDis
    ) {
      point = {
        x: pWallLine.m_vStart.x,
        y: pWallLine.m_vStart.y,
        z: pWallLine.m_vStart.z
      };
      return point;
    }

    if (
      Math.abs(x1 - pWallLine.m_vEnd.x) < fDis &&
      Math.abs(y1 - pWallLine.m_vEnd.y) < fDis
    ) {
      point = {
        x: pWallLine.m_vEnd.x,
        y: pWallLine.m_vEnd.y,
        z: pWallLine.m_vEnd.z
      };
      return point;
    }

    var vVector1 = new THREE.Vector3(
      x1 - pWallLine.m_vStart.x,
      y1 - pWallLine.m_vStart.y,
      z1 - pWallLine.m_vStart.z
    );
    var vVector2 = new THREE.Vector3(
      pWallLine.m_vEnd.x - pWallLine.m_vStart.x,
      pWallLine.m_vEnd.y - pWallLine.m_vStart.y,
      pWallLine.m_vEnd.z - pWallLine.m_vStart.z
    );

    vVector2.normalize();

    var d = Math.sqrt(
      (pWallLine.m_vEnd.x - pWallLine.m_vStart.x) *
        (pWallLine.m_vEnd.x - pWallLine.m_vStart.x) +
        (pWallLine.m_vEnd.y - pWallLine.m_vStart.y) *
          (pWallLine.m_vEnd.y - pWallLine.m_vStart.y) +
        (pWallLine.m_vEnd.z - pWallLine.m_vStart.z) *
          (pWallLine.m_vEnd.z - pWallLine.m_vStart.z)
    );

    var t = vVector2.dot(vVector1);

    if (t <= 0) {
      return null;
    }
    if (t >= d) {
      return null;
    }

    var vClosestPoint = new THREE.Vector3();
    vClosestPoint.x = pWallLine.m_vStart.x + vVector2.x * t;
    vClosestPoint.y = pWallLine.m_vStart.y + vVector2.y * t;
    vClosestPoint.z = pWallLine.m_vStart.z + vVector2.z * t;

    d = Math.sqrt(
      (x1 - vClosestPoint.x) * (x1 - vClosestPoint.x) +
        (y1 - vClosestPoint.y) * (y1 - vClosestPoint.y) +
        (z1 - vClosestPoint.z) * (z1 - vClosestPoint.z)
    );

    if (d >= fDis) {
      return null;
    }

    point = {
      x: vClosestPoint.x,
      y: vClosestPoint.y,
      z: vClosestPoint.z
    };

    return point;
  }
}

export default new DrawWall();
