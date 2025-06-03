const vertexShaderContents =
`
precision mediump float;

attribute vec3 vertPosition;
attribute vec2 textureCoord;

uniform mat4 mModel;
uniform mat4 mView;
uniform mat4 mProj;

varying vec2 fragTextureCoord;

void main() {
    fragTextureCoord = textureCoord;

    gl_Position = mProj * mView * mModel * vec4(vertPosition, 1.0);
}
`