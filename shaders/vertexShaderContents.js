const vertexShaderContents = `
precision mediump float;

attribute vec3 vertPosition;
attribute vec2 textureCoord;
attribute vec3 vertNormal;

uniform mat4 mModel;
uniform mat4 mView;
uniform mat4 mProj;

varying vec2 fragTextureCoord;
varying vec3 fragmentNormal;

void main() {
    fragTextureCoord = textureCoord;

    fragmentNormal = vertNormal;

    gl_Position = mProj * mView * mModel * vec4(vertPosition, 1.0);
}
`;
