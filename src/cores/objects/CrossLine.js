import * as THREE from "three";
import { scene } from "../scene/index";

class CrossLine {
  constructor() {
    // 十字线
    this.instance = null;
    this.mHelpCoss;
    // 墙体顶点
    this.mHelpWallPos1;
    this.mHelpWallPos2;
    this.mHelpWallPos3;
    this.mHelpWallPos4;
    // 移动时感应变红的墙体
    this.mHelpWall;
    this.mPointsMaterial;
    this.mBlueMaterial;
    this.mOutLine = null;
    // 参考线
    this.mHelpLine_Start = null;
    // 辅助线
    this.mHelpLine_End = null;

    this.m_vStart = new THREE.Vector3(-99999, -99999, 1);
    this.m_vEnd = new THREE.Vector3(-99999, -99999, 1);
    // 矩形
    this.mRectangle;
  }

  init() {
    this.CreateHelpCross();
    this.CreateHelpWall();
    this.CreateHelpPos1();
    this.OnCreateMultiSelect(); //  多选
    this.OnClear();
  }

  // 十字参考线
  CreateHelpCross() {
    var h = 8000;
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(-h, 0, 1),
      new THREE.Vector3(h, 0, 1)
    );
    geometry.vertices.push(
      new THREE.Vector3(0, -h, 1),
      new THREE.Vector3(0, h, 1)
    );
    this.mHelpCoss = new THREE.LineSegments(
      geometry,
      new THREE.LineDashedMaterial({
        color: 0xff0000,
        dashSize: 30,
        gapSize: 10,
        linewidth: 1,
        opacity: 0.5,
        transparent: true
      })
    );
    this.mHelpCoss.computeLineDistances();
    this.mHelpCoss.visible = true;
    // objects.push(this.mHelpCoss);

    var sphere = new THREE.CircleGeometry(9, 9);
    this.mPointsMaterial = new THREE.PointsMaterial({ color: 0x00a1ff });
    this.sphereMesh = new THREE.Mesh(sphere, this.mPointsMaterial);
    this.mBlueMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    this.sphereMesh.position.z = 1;
    this.mHelpCoss.add(this.sphereMesh);
    this.mHelpCoss.add(new THREE.Line(sphere, this.mBlueMaterial));

    // scene.add( this.mHelpCoss );
  }

  // 创建辅助点
  CreateHelpPos1() {
    var sphere = new THREE.CircleGeometry(9, 9);
    this.mHelpWallPos1 = new THREE.Mesh(sphere, this.mPointsMaterial);
    this.mHelpWallPos2 = new THREE.Mesh(sphere, this.mPointsMaterial);
    this.mHelpWallPos3 = new THREE.Mesh(sphere, this.mPointsMaterial);
    this.mHelpWallPos4 = new THREE.Mesh(sphere, this.mPointsMaterial);
    this.mHelpWallPos1.add(new THREE.Line(sphere, this.mBlueMaterial));
    this.mHelpWallPos2.add(new THREE.Line(sphere, this.mBlueMaterial));
    this.mHelpWallPos3.add(new THREE.Line(sphere, this.mBlueMaterial));
    this.mHelpWallPos4.add(new THREE.Line(sphere, this.mBlueMaterial));

    // scene.add(this.mHelpWallPos1);
    // scene.add(this.mHelpWallPos2);
    // scene.add(this.mHelpWallPos3);
    // scene.add(this.mHelpWallPos4);
  }

  CreateHelpWall() {
    var geometry = new THREE.BoxBufferGeometry(1, 1, 0.5);
    this.mHelpWall = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 1,
        transparent: false
      })
    );
    this.mHelpWall.visible = false;
    //  scene.add( this.mHelpWall );
  }

  // 初始化状态
  OnClear() {
    //  this.mHelpCoss.visible = false;
    this.mHelpCoss.position.x = -999999;
    this.mHelpCoss.position.y = -999999;
    this.mHelpWallPos1.position.x = -999999;
    this.mHelpWallPos1.position.y = -999999;
    this.mHelpWallPos2.position.x = -999999;
    this.mHelpWallPos2.position.y = -999999;
    this.mHelpWallPos3.position.x = -999999;
    this.mHelpWallPos3.position.y = -999999;
    this.mHelpWallPos4.position.x = -999999;
    this.mHelpWallPos4.position.y = -999999;
    this.ClearOutline();
  }

  mouseMove() {}

  OnShow(bShow) {
    this.mHelpCoss.visible = bShow;
    this.mHelpWallPos1.visible = bShow;
  }

  OnShowPosAll(vPos1, vPos2, vPos3, vPos4) {
    this.mHelpWallPos1.position.x = vPos1.x;
    this.mHelpWallPos1.position.y = vPos1.y;
    this.mHelpWallPos2.position.x = vPos2.x;
    this.mHelpWallPos2.position.y = vPos2.y;
    this.mHelpWallPos3.position.x = vPos3.x;
    this.mHelpWallPos3.position.y = vPos3.y;
    this.mHelpWallPos4.position.x = vPos4.x;
    this.mHelpWallPos4.position.y = vPos4.y;
    this.mHelpWallPos1.position.z = 2;
    this.mHelpWallPos2.position.z = 2;
    this.mHelpWallPos3.position.z = 2;
    this.mHelpWallPos4.position.z = 2;
  }

  OnHidePosAll() {
    this.mHelpWallPos1.position.x = -999999;
    this.mHelpWallPos1.position.y = -999999;
    this.mHelpWallPos2.position.x = -999999;
    this.mHelpWallPos2.position.y = -999999;
    this.mHelpWallPos3.position.x = -999999;
    this.mHelpWallPos3.position.y = -999999;
    this.mHelpWallPos4.position.x = -999999;
    this.mHelpWallPos4.position.y = -999999;
    this.mHelpWall.visible = false;
  }

  OnShowHelpWall(tWall) {
    this.mHelpWallPos1.visible = true;
    this.mHelpWallPos2.visible = true;
    this.mHelpWallPos1.position.x = tWall.m_vStart.x;
    this.mHelpWallPos1.position.y = tWall.m_vStart.y;
    this.mHelpWallPos2.position.x = tWall.m_vEnd.x;
    this.mHelpWallPos2.position.y = tWall.m_vEnd.y;
    this.mHelpWallPos1.position.z = 2;
    this.mHelpWallPos2.position.z = 2;
  }

  // ClearOutline() {
  //   scene.remove(this.mOutLine);
  //   scene3D.remove(this.mOutLine);

  //   for (var j = 0; j < mHouseClass.mFloorClass.mFloorArray.length; j++)
  //     mHouseClass.mFloorClass.mFloorArray[j].OnShowLabel(true);
  //   //scene.remove(mHouseClass.mWallClass.mHelpWall);
  // }

  // 显示轮廓辅助线
  // ShowOutLine_Floor3D(tFloor) {
  //   this.ClearOutline();
  //   var positions = [];
  //   var colors = [];
  //   var geom = new THREE.Geometry();
  //   for (var i = 0; i < tFloor.mLabelArray_Out.length; i++) {
  //     positions.push(
  //       tFloor.mLabelArray_Out[i].m_vStart_Floor.x,
  //       0,
  //       -tFloor.mLabelArray_Out[i].m_vStart_Floor.y
  //     );
  //     positions.push(
  //       tFloor.mLabelArray_Out[i].m_vEnd_Floor.x,
  //       0,
  //       -tFloor.mLabelArray_Out[i].m_vEnd_Floor.y
  //     );
  //     colors.push(1, 1, 0.5);
  //     colors.push(1, 1, 0.5);
  //   }

  //   var geometry1 = new THREE.LineGeometry();
  //   geometry1.setPositions(positions);
  //   geometry1.setColors(colors);

  //   this.mOutLine = new THREE.Line2(geometry1, mResource.matLine);
  //   scene3D.add(this.mOutLine);
  // }

  // ShowOutLine_Floor2D(tFloor) {
  //   this.ClearOutline();

  //   var positions = [];
  //   var colors = [];
  //   var geom = new THREE.Geometry();
  //   for (var i = 0; i < tFloor.mLabelArray_Out.length; i++) {
  //     positions.push(
  //       tFloor.mLabelArray_Out[i].m_vStart_Floor.x,
  //       tFloor.mLabelArray_Out[i].m_vStart_Floor.y,
  //       0
  //     );
  //     positions.push(
  //       tFloor.mLabelArray_Out[i].m_vEnd_Floor.x,
  //       tFloor.mLabelArray_Out[i].m_vEnd_Floor.y,
  //       0
  //     );
  //     colors.push(1, 1, 0.5);
  //     colors.push(1, 1, 0.5);
  //   }

  //   var geometry1 = new THREE.LineGeometry();
  //   geometry1.setPositions(positions);
  //   geometry1.setColors(colors);

  //   this.mOutLine = new THREE.Line2(geometry1, mResource.matLine);
  //   scene.add(this.mOutLine);
  // }

  OnCreateMultiSelect() {
    var tBox = new THREE.PlaneGeometry(1, 1, 1);
    var tMat = new THREE.MeshBasicMaterial({
      color: 0x00a2fc,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });

    this.mRectangle = new THREE.Mesh(tBox, tMat);
    this.mRectangle.visible = false;
    scene.add(this.mRectangle);
  }

  OnStartMultiSelect(mouseX, mouseY) {
    this.m_vStart.x = mouseX;
    this.m_vStart.y = mouseY;
  }

  OnMoveMultiSelect(mouseX, mouseY) {
    if (this.m_vStart.x == -99999 && this.m_vStart.y == -99999) return;
    this.mRectangle.visible = true;
    this.m_vEnd.x = mouseX;
    this.m_vEnd.y = mouseY;

    var fL = Math.abs(this.m_vEnd.x - this.m_vStart.x);
    var fw = Math.abs(this.m_vEnd.y - this.m_vStart.y);

    this.mRectangle.scale.set(fL, fw, 1);
    this.mRectangle.position.x = (this.m_vEnd.x + this.m_vStart.x) / 2;
    this.mRectangle.position.y = (this.m_vEnd.y + this.m_vStart.y) / 2;
    this.mRectangle.position.z = 2;
  }

  // OnEndMultiSelect(mouseX, mouseY) {
  //   if (this.mRectangle.visible == true)
  //     mHouseClass.mFurnitureClass.OnPickMulti2D(this.m_vStart, this.m_vEnd);
  //   this.m_vStart.x = this.m_vEnd.x = -99999;
  //   this.m_vStart.y = this.m_vEnd.y = -99999;
  //   this.mRectangle.visible = false;
  // }
}

export default new CrossLine();
