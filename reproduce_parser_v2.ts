
import { textToTags, tagsToText } from './src/utils/promptParser';

// Test Case
const input = "aaa \\(bbb\\)";
console.log("Input:", input);
const tags = textToTags(input);
console.log("Parsed Tags:", JSON.stringify(tags, null, 2));

const output = tagsToText(tags);
console.log("Output:", output);

if (output.includes("\\\\(")) {
    console.log("FAIL: Double escaping detected!");
} else if (output.trim().replace(/,$/, '') === input) {
    console.log("PASS: Output matches input.");
} else {
    // It might differ slightly if we normalized spacing etc, but key is no double escape
    console.log("INFO: Output is:", output);
    if (!output.includes("\\\\(")) {
        console.log("PASS: No double escaping.");
    }
}

// Test Weighted double escape
const inputWeighted = "(aaa \\(bbb\\):1.0)";
console.log("\nInput Weighted:", inputWeighted);
const tagsW = textToTags(inputWeighted);
console.log("Parsed Tags Weighted:", JSON.stringify(tagsW, null, 2));
const outputW = tagsToText(tagsW);
console.log("Output Weighted:", outputW);

if (outputW.includes("\\\\(")) {
    console.log("FAIL: Double escaping in weighted tag!");
} else {
    console.log("PASS: No double escaping in weighted tag.");
}
