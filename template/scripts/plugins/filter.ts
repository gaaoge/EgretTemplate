/**
 * 过滤插件，用于去除一些构建后不需要保存的文件
 * Created by GG on 2018/01/30
 */
import * as fs from 'fs';
import * as path from 'path';

export class FilterPlugin implements plugins.Command {

    constructor() {
    }

    async onFile(file: plugins.File) {
        if (file.extname === '.exml' || file.basename === 'default.thm.json') {
            return null;
        }
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {
    }
}