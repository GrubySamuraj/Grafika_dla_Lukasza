const glm = glMatrix;

let app = {
  meshes: {},
};

function stardDraw() {
  OBJ.downloadMeshes(
    {
      car: "texture.png",
    },
    Triangle
  );
}

const Triangle = function () {
  const canvas = document.getElementById("main-canvas");
  const gl = canvas.getContext("webgl2");

  checkGl(gl);
  console.log(canvas);

  let canvas_color = [0.2, 0.2, 0.3];
  gl.clearColor(...canvas_color, 1.0); // this function accepts 4 args, (...) unrolls canvas_color variable

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  // console.log(vertexShaderContents);
  gl.shaderSource(vertexShader, vertexShaderContents);
  gl.shaderSource(fragmentShader, fragmentShaderContents);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  const boxVertices = [
    // X, Y, Z
    // Top
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

    // Left
    -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0,

    // Right
    1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,

    // Front
    1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0,

    // Back
    1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0,

    // Bottom
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0,
  ];

  const boxIndices = [
    // Top
    0, 1, 2, 0, 2, 3,

    // Left
    5, 4, 6, 6, 4, 7,

    // Right
    8, 9, 10, 8, 10, 11,

    // Front
    13, 12, 14, 15, 14, 12,

    // Back
    16, 17, 18, 16, 18, 19,

    // Bottom
    21, 20, 22, 22, 20, 23,
  ];

  // let colors =
  // [
  //     1.0, 0.0, 0.0,
  //     0.0, 1.0, 0.0,
  //     0.0, 0.2, 1.0,
  //     0.5, 1.0, 0.0,

  //     0.8, 0.0, 0.2,
  //     0.0, 1.0, 1.0,
  //     0.0, 0.2, 1.0,
  //     0.5, 1.0, 0.0,

  //     1.0, 0.0, 0.0,
  //     0.0, 1.0, 0.0,
  //     0.0, 0.2, 1.0,
  //     0.5, 1.0, 0.0,

  //     1.0, 0.0, 0.0,
  //     0.0, 1.0, 0.0,
  //     0.0, 0.2, 1.0,
  //     0.5, 1.0, 0.0,

  //     1.0, 0.0, 0.0,
  //     0.0, 1.0, 0.0,
  //     0.0, 0.2, 1.0,
  //     0.5, 1.0, 0.0,

  //     1.0, 0.0, 0.0,
  //     0.0, 1.0, 0.0,
  //     0.0, 0.2, 1.0,
  //     0.5, 1.0, 0.0,
  // ];

  const boxTexCoords = [
    0, 0, 0, 1, 1, 1, 1, 0,

    0, 0, 1, 0, 1, 1, 0, 1,

    // second
    0.25, 0.25, 0, 0.25, 0, 0, 0.25, 0,

    1, 1, 1, 0, 0, 0, 0, 1,

    0, 0, 0, 1, 1, 1, 1, 0,

    1, 1, 1, 0, 0, 0, 0, 1,
  ];

  // const triangleVertBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
  const cubeVertBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

  const cubeIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(boxIndices),
    gl.STATIC_DRAW
  );

  const posAttribLocation = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(
    posAttribLocation,
    3, // number of components (here is 3, bcs we are in 3d space)
    gl.FLOAT, // type of that attrib, location is in floats
    false, // if the thing should be normalized
    3 * Float32Array.BYTES_PER_ELEMENT, // STRIDE offset in bytes between the beginning of consecutive vertex attributes.
    0
  );
  gl.enableVertexAttribArray(posAttribLocation);

  // const triangleColorBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // const colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
  // gl.vertexAttribPointer(
  //     colorAttribLocation,    //index
  //     3, // number of components
  //     gl.FLOAT,// type of that attrib, location is in floats
  //     false,// if the thing should be normalized
  //     3*Float32Array.BYTES_PER_ELEMENT, // STRIDE offset in bytes between the beginning of consecutive vertex attributes.
  //     0
  // );
  // gl.enableVertexAttribArray(colorAttribLocation);

  const textureBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(boxTexCoords),
    gl.STATIC_DRAW
  );
  const textureAttribLocation = gl.getAttribLocation(program, "textureCoord");
  gl.vertexAttribPointer(
    textureAttribLocation, //index
    2, // number of components
    gl.FLOAT, // type of that attrib, location is in floats
    false, // if the thing should be normalized
    2 * Float32Array.BYTES_PER_ELEMENT, // STRIDE offset in bytes between the beginning of consecutive vertex attributes.
    0
  );
  gl.enableVertexAttribArray(textureAttribLocation);

  const boxTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, boxTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("img")
  );

  const modelMatLocation = gl.getUniformLocation(program, "mModel");
  const viewMatLocation = gl.getUniformLocation(program, "mView");
  const projMatLocation = gl.getUniformLocation(program, "mProj");

  let modelMatrix = glm.mat4.create();
  let translation = glm.vec3.fromValues(0, 0, 0);
  let rotation = glm.quat.create();
  rotation = glm.quat.setAxisAngle(
    rotation,
    [0, 1, 0],
    glm.glMatrix.toRadian(40)
  );
  let scaling = glm.vec3.fromValues(1, 1, 1);
  glm.mat4.fromRotationTranslationScale(
    modelMatrix,
    rotation,
    translation,
    scaling
  );

  let viewMatrix = glm.mat4.create();
  glm.mat4.lookAt(viewMatrix, [0, 0, -2], [0, 0, 0], [0, 1, 0]); // vectors are: position of the camera, which way they are looking, which way is up
  let projMatrix = glm.mat4.create();
  glm.mat4.perspective(
    projMatrix,
    glm.glMatrix.toRadian(45),
    canvas.width / canvas.height,
    0.1,
    1000.0
  );

  gl.useProgram(program);

  gl.uniformMatrix4fv(modelMatLocation, false, modelMatrix);
  gl.uniformMatrix4fv(viewMatLocation, false, viewMatrix);
  gl.uniformMatrix4fv(projMatLocation, false, projMatrix);

  const loop = function () {
    angle = ((performance.now() / 1000 / 6) * 2 * Math.PI) / 4; // 1000 milisecs, 6 bcs of minute count, 2x so it's two, PI is whole rotation
    translation = glm.vec3.fromValues(0, 0, 0);
    rotation = glm.quat.setAxisAngle(rotation, [0, 1, 0], angle);
    scaling = glm.vec3.fromValues(0.5, 0.5, 0.5);
    glm.mat4.fromRotationTranslationScale(
      modelMatrix,
      rotation,
      translation,
      scaling
    );

    gl.uniformMatrix4fv(modelMatLocation, false, modelMatrix);

    gl.clearColor(...canvas_color, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.activeTexture(gl.TEXTURE0); // 0 is the index of an buffer

    // gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  // gl.uniform1f(scaleLocation, 0.75);
  // gl.uniform2f(offsetLocation, -0.25, -0.25);
  // gl.drawArrays(gl.TRIANGLES, 0, 3);

  // gl.uniform1f(scaleLocation, 0.5);
  // gl.uniform2f(offsetLocation, 0.25, 0.25);
  // gl.drawArrays(gl.TRIANGLES, 0, 3);
};

function checkGl(gl) {
  if (!gl) {
    console.log("WebGL not supported, use another browser");
  }
}
