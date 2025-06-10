const fragmentShaderContents = `
precision mediump float;

varying vec2 fragTextureCoord;
varying vec3 fragmentNormal;

uniform vec3 ambientLightIntensity;
uniform vec3 lightDirection;
uniform vec3 lightColor;


uniform sampler2D sampler;

void main() {
    vec4 texel = texture2D(sampler, fragTextureCoord);

    vec3 lightIntensity = ambientLightIntensity + lightColor * max(dot(fragmentNormal, lightDirection), 0.0);

    gl_FragColor = vec4(texel.rgb * lightIntensity, texel.a);
}
`;
