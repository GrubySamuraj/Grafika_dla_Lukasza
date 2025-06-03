const fragmentShaderContents =
`
precision mediump float;

varying vec2 fragTextureCoord;

uniform sampler2D sampler;

void main() {
    gl_FragColor = texture2D(sampler, fragTextureCoord);
}
`