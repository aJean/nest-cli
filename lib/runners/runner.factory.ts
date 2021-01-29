import * as chalk from 'chalk';
import { NpmRunner } from './npm.runner';
import { Runner } from './runner';
import { SchematicRunner } from './schematic.runner';
import { YarnRunner } from './yarn.runner';

/**
 * @file 工厂 + 抽象类模式，工厂创建子类，子类构造注入参数，方法都在抽象类上面
 *       工厂负责通过参数创建不同的子类
 *       子类负责将外部参数转化为内部参数
 *       抽象类定义通用的方法
 */

export class RunnerFactory {
  public static create(runner: Runner) {
    switch (runner) {
      case Runner.SCHEMATIC:
        return new SchematicRunner();

      case Runner.NPM:
        return new NpmRunner();

      case Runner.YARN:
        return new YarnRunner();

      default:
        console.info(chalk.yellow(`[WARN] Unsupported runner: ${runner}`));
    }
  }
}
