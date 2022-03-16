const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'sdomain_api',

  deps: [
    'aws-sdk@^2.954.0',
  ], /* Runtime dependencies of this module. */
  description: 'Student Domain Api', /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    'webpack@^5.53.0',
  ], /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.addTask('clean', {
  description: '',
  exec: 'rimraf dist build coverage cdk.out cdk.context.json',
});

project.removeTask('build');

project.addTask('build', {
  description: '',
  exec: 'tsc',
});

project.removeTask('deploy');
project.addTask('bootstrap', {
  description: '',
  exec: 'cdk bootstrap',
});

project.addTask('deploy', {
  description: '',
  exec: 'tsc && cdk deploy',
});

project.jest.preset = 'ts-jest';
project.tsconfig.compilerOptions.paths = {
  '@cdk/*': ['./cdk/*'],
  '@src/*': ['./src/*'],
  '@common/*': ['./src/common/*'],
  '@tests/*': ['./tests/*'],
};
project.tsconfig.compilerOptions.baseUrl = '.';
project.tsconfig.compilerOptions.outDir = 'src';
project.tsconfig.compilerOptions.moduleResolution = 'node';
project.tsconfig.compilerOptions.noImplicitAny = false;
project.tsconfig.compilerOptions.strictPropertyInitialization = false;
project.tsconfig.compilerOptions.suppressImplicitAnyIndexErrors = true;
project.tsconfig.compilerOptions.emitDecoratorMetadata = true;
project.tsconfig.compilerOptions.skipLibCheck = true;
project.tsconfig.compilerOptions.noUnusedLocals = false;
project.tsconfig.compilerOptions.typeRoots = ['./node_modules/@types'];
project.tsconfig.compilerOptions.types = ['jest', 'node'];
project.tsconfig.compilerOptions.skipLibCheck = true;
project.tsconfig.compilerOptions.emitDecoratorMetadata = true;

project.tsconfig.addExclude('./cdk.out');
project.tsconfig.addExclude('./node_modules');
project.tsconfig.addExclude('./dist');
project.tsconfig.addExclude('./build');

delete project.tsconfig.compilerOptions.rootDir;

project.tsconfigDev.compilerOptions.paths = {
  '@cdk/*': ['./cdk/*'],
  '@src/*': ['./src/*'],
  '@common/*': ['./src/common/*'],
  '@tests/*': ['./tests/*'],
};
project.tsconfigDev.compilerOptions.baseUrl = '.';
project.tsconfigDev.compilerOptions.outDir = 'src';
project.tsconfigDev.compilerOptions.moduleResolution = 'node';
project.tsconfigDev.compilerOptions.noImplicitAny = false;
project.tsconfigDev.compilerOptions.strictPropertyInitialization = false;
project.tsconfigDev.compilerOptions.suppressImplicitAnyIndexErrors = true;
project.tsconfigDev.compilerOptions.emitDecoratorMetadata = true;
project.tsconfigDev.compilerOptions.skipLibCheck = true;
project.tsconfigDev.compilerOptions.noUnusedLocals = false;
project.tsconfigDev.compilerOptions.typeRoots = ['./node_modules/@types'];
project.tsconfigDev.compilerOptions.types = ['jest', 'node'];
project.tsconfigDev.compilerOptions.skipLibCheck = true;
project.tsconfigDev.compilerOptions.emitDecoratorMetadata = true;

project.tsconfigDev.addExclude('./cdk.out');
project.tsconfigDev.addExclude('./node_modules');
project.tsconfigDev.addExclude('./dist');
project.tsconfigDev.addExclude('./build');

project.tsconfigDev.addInclude('webpack.config.ts');
project.tsconfig.addInclude('webpack.config.ts');
project.tsconfigDev.addInclude('cdk/**/*.ts');
project.tsconfig.addInclude('cdk/**/*.ts');
project.tsconfigDev.addInclude('scripts/swagger.ts');
project.tsconfig.addInclude('scripts/swagger.ts');
project.tsconfigDev.addInclude('jest.setup.ts');
project.tsconfig.addInclude('jest.setup.ts');

project.synth();