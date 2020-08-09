import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

function createConfig(fileName) {
    return {
        input: `${fileName}.ts`,
        output: {
            file: `${fileName}.js`,
            format: 'iife',
            name: 'app'
        },
        plugins: [
            nodeResolve(),
            typescript(),
        ],
    };
}

const configsList = [
    'Project\ 13/index',
  ].map((fileName) => createConfig(fileName));

export default configsList;
