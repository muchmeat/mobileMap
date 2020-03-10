const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log("======您正在使用瑞信React Native模板项目构建工具，依赖RN版本0.57.8======");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// rxRnTemplate
const defaultProjectName = "rxRnTemplate", defaultGradle = "4.7", defaultGralePlugin = "3.2.0";
let projectName, gradle, gradlePlugin;

rl.on('close', () => {
    console.log(
        `===============正在构建项目 ${projectName}===============`
    );
    // React Native
    replaceFileMultiText("./package.json", [[`"name": "${defaultProjectName}"`, `"name": "${projectName}"`]]);
    replaceFileMultiText("./app.json", [[defaultProjectName, projectName]]);

    //Android
    //先操作包名，避免异步操作文件时出现异常
    fs.rename(`./android/app/src/main/java/com/${defaultProjectName.toLocaleLowerCase()}`, `./android/app/src/main/java/com/${projectName.toLocaleLowerCase()}`, (err) => {
            if (err) throw err;
            let pros = [
                ["./android/settings.gradle", [[`rootProject.name = '${defaultProjectName.toLowerCase()}'`, `rootProject.name = '${projectName.toLowerCase()}'`]]],
                ["./android/app/build.gradle", [[`com.${defaultProjectName.toLowerCase()}`, `com.${projectName.toLowerCase()}`]]],
                ["./android/app/src/main/AndroidManifest.xml", [[`com.${defaultProjectName.toLowerCase()}`, `com.${projectName.toLowerCase()}`]]],
                ["./android/app/src/main/res/values/strings.xml", [[`>${defaultProjectName}<`, `>${projectName}<`]]],
                [`./android/app/src/main/java/com/${projectName.toLowerCase()}/MainApplication.java`,
                    [[`package com.${defaultProjectName.toLowerCase()}`, `package com.${projectName.toLowerCase()}`]]],
                [`./android/app/src/main/java/com/${projectName.toLowerCase()}/MainActivity.java`,
                    [[`package com.${defaultProjectName.toLowerCase()}`, `package com.${projectName.toLowerCase()}`],
                        [`return "${defaultProjectName}"`, `return "${projectName}"`]]]
            ];
            //gradle及gradle Plugin相关
            let gradleArr = [];
            if (gradle && gradle.trim().length) {
                gradleArr.push([`gradleVersion = '${defaultGradle}'`, `gradleVersion = '${gradle}'`]);
                pros.push(["./android/gradle/wrapper/gradle-wrapper.properties", [[`gradle-${defaultGradle}-all.zip'`, `gradle-${gradle}-all.zip'`]]]);
            }
            if (gradlePlugin && gradlePlugin.trim().length) {
                gradleArr.push([`com.android.tools.build:gradle:${defaultGralePlugin}`, `com.android.tools.build:gradle:${gradlePlugin}`]);
            }
            if (gradleArr.length) {
                pros.push(["./android/build.gradle", gradleArr]);
            }
            Promise.all(pros.map(it => replaceFileMultiText(it[0], it[1]))).then(() => {
                console.log(
                    "\n===============构建完成==============="
                );
            }).catch((e) => console.log(e));

            // console.log(pros.length);
        }
    );
});

rl.question('请输入App项目工程名: ', (a1) => {
    if (a1 && a1.trim().length) {
        projectName = a1;
        console.log(
            `===============准备构建项目 ${projectName}===============`
        );
        rl.question('请输入您使用的gradle版本(>=4.7),按回车键跳过: ', (a2) => {
            if (a2 && a2.trim().length) {
                gradle = a2;
            } else {
                gradle = defaultGradle;
            }
            rl.question('请输入您使用的gradlePlugin版本(>=3.2.0),按回车键跳过: ', (a3) => {
                if (a3 && a3.trim().length) {
                    gradlePlugin = a3;
                } else {
                    gradlePlugin = defaultGralePlugin;
                }
                rl.close();
            });
        });

    } else {
        console.log("===============无效的工程名，取消构建===============");
        rl.close();
    }
});

//替换文本文件中的文字
let replaceFileMultiText = (filePath, arr) => {
    return new Promise(function (resolve, reject) {
        fs.open(filePath, 'r', (err, fd) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.log(
                        `===============文件${filePath}不存在===============`
                    );
                }
            } else {
                fs.readFile(filePath, function (err, buffer) {
                    if (arr && arr.length) {
                        let result = buffer.toString();
                        arr.forEach(function (v) {
                            result = result.replace(new RegExp(v[0], 'g'), v[1]);
                        });
                        if (result) {
                            fs.writeFile(filePath, result, 'utf8', function (err) {
                                if (err) throw err;
                                process.stdout.write("█");
                                resolve();
                            });
                        }
                    }
                });
            }
        });
    });
};
