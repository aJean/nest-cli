import * as chalk from 'chalk';
import { CommanderStatic } from 'commander';
import {
  AddAction,
  BuildAction,
  GenerateAction,
  InfoAction,
  NewAction,
  StartAction,
  UpdateAction,
} from '../actions';
import { ERROR_PREFIX } from '../lib/ui';
import { AddCommand } from './add.command';
import { BuildCommand } from './build.command';
import { GenerateCommand } from './generate.command';
import { InfoCommand } from './info.command';
import { NewCommand } from './new.command';
import { StartCommand } from './start.command';
import { UpdateCommand } from './update.command';

/**
 * @file 实例化命令，要 new 很多次的原因是 commander 的注册和类绑定在了一起
 *       如果在外部注册，就可以只创建当前命令的实例了 
 */

export class CommandLoader {
  public static load(program: CommanderStatic): void {
    // 通过 program 去注册不同类别的命令，简单的依赖注入，action 可以不与 commander 绑定
    new NewCommand(new NewAction()).load(program);
    new BuildCommand(new BuildAction()).load(program);
    new StartCommand(new StartAction()).load(program);
    new InfoCommand(new InfoAction()).load(program);
    new UpdateCommand(new UpdateAction()).load(program);
    new AddCommand(new AddAction()).load(program);
    new GenerateCommand(new GenerateAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
        program.args.join(' '),
      );
      console.log(
        `See ${chalk.red('--help')} for a list of available commands.\n`,
      );
      process.exit(1);
    });
  }
}
