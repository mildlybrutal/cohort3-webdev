import { readFile } from "fs";
import { Command } from "commander";
import { default as chalk } from "chalk";
const program = new Command();

program
    .name("counter")
    .description("CLI to do file based tasks")
    .version("0.8.0");

program
    .command("count")
    .description(
        "user specify a file path and the nodejs process counts the number of words inside it."
    )
    .argument("<file>", "File to count")
    .action((file) => {
        readFile(file, "utf-8", (err, data) => {
            if (err) {
                console.log(chalk.red("Error"));
            } else {
                let total = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === " ") {
                        total++;
                    }
                }
                console.log(
                    chalk.green(`There are ${total+1} words in the ${file}`)
                );
            }
        });
    });

program.parse();
