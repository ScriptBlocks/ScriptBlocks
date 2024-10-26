// Define your block definitions
const definitions = [
    {
        "type": "create_app",
        "message0": "Create app with name %1",
        "args0": [
            {
                "type": "field_input",
                "name": "FIELD_NAME",
                "text": "myApp"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    },
    {
        "type": "set_app_property",
        "message0": "Set %1 to %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PROPERTY",
                "options": [
                    ["width", "WIDTH"],
                    ["height", "HEIGHT"]
                ]
            },
            {
                "type": "field_number",
                "name": "VALUE",
                "value": 100
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    },
    {
        "type": "play_sound",
        "message0": "Play sound %1",
        "args0": [
            {
                "type": "field_input",
                "name": "SOUND_PATH",
                "text": "path/to/sound"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230
    },
    {
        "type": "math_add",
        "message0": "%1 + %2",
        "args0": [
            {
                "type": "input_value",
                "name": "A"
            },
            {
                "type": "input_value",
                "name": "B"
            }
        ],
        "inputsInline": true,
        "output": "Number",
        "colour": 230
    },
    {
        "type": "math_subtract",
        "message0": "%1 - %2",
        "args0": [
            {
                "type": "input_value",
                "name": "A"
            },
            {
                "type": "input_value",
                "name": "B"
            }
        ],
        "inputsInline": true,
        "output": "Number",
        "colour": 230
    },
    {
        "type": "math_multiply",
        "message0": "%1 * %2",
        "args0": [
            {
                "type": "input_value",
                "name": "A"
            },
            {
                "type": "input_value",
                "name": "B"
            }
        ],
        "inputsInline": true,
        "output": "Number",
        "colour": 230
    },
    {
        "type": "math_divide",
        "message0": "%1 / %2",
        "args0": [
            {
                "type": "input_value",
                "name": "A"
            },
            {
                "type": "input_value",
                "name": "B"
            }
        ],
        "inputsInline": true,
        "output": "Number",
        "colour": 230
    },
    {
        "type": "controls_if",
        "message0": "if %1 then",
        "args0": [
            {
                "type": "input_value",
                "name": "IF0",
                "check": "Boolean"
            }
        ],
        "message1": "do %1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO0"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 210
    },
    {
        "type": "controls_repeat_ext",
        "message0": "repeat %1 times",
        "args0": [
            {
                "type": "input_value",
                "name": "TIMES",
                "check": "Number"
            }
        ],
        "message1": "do %1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120
    },
    {
        "type": "variables_set",
        "message0": "set %1 to %2",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "item"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 330
    },
    {
        "type": "variables_get",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "item"
            }
        ],
        "output": null,
        "colour": 330
    },
    {
        "type": "plaintext",
        "message0": "Text %1",
        "args0": [
            {
                "type": "field_input",
                "name": "TEXT",
                "text": "default text"
            }
        ],
        "output": "String",
        "colour": 160
    },
    {
        "type": "plainnumber",
        "message0": "Number %1",
        "args0": [
            {
                "type": "field_number",
                "name": "NUMBER",
                "value": 0
            }
        ],
        "output": "Number",
        "colour": 230
    },
    {
        "type": "logic_compare",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "A"
            },
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["=", "EQ"],
                    ["≠", "NEQ"],
                    ["<", "LT"],
                    ["≤", "LTE"],
                    [">", "GT"],
                    ["≥", "GTE"]
                ]
            },
            {
                "type": "input_value",
                "name": "B"
            }
        ],
        "output": "Boolean",
        "colour": 210
    },
    {
        "type": "logic_operation",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "A",
                "check": "Boolean"
            },
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["and", "AND"],
                    ["or", "OR"]
                ]
            },
            {
                "type": "input_value",
                "name": "B",
                "check": "Boolean"
            }
        ],
        "output": "Boolean",
        "colour": 210
    },
    {
        "type": "general_print",
        "message0": "Print %1",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    },
    {
        "type": "sound_set_volume",
        "message0": "Set volume to %1",
        "args0": [
            {
                "type": "field_number",
                "name": "VOLUME",
                "value": 100
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230
    },
    {
        "type": "text_length",
        "message0": "Length of %1",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String"
            }
        ],
        "output": "Number",
        "colour": 160
    },
    {
        "type": "app_set_background",
        "message0": "Set background color to %1",
        "args0": [
            {
                "type": "field_colour",
                "name": "COLOUR",
                "colour": "#ffffff"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    },
    {
        "type": "event_on_start",
        "message0": "When start",
        "nextStatement": null,
        "colour": 20
    },
    {
        "type": "event_on_key_press",
        "message0": "When key %1 pressed",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "KEY",
                "options": [
                    ["A", "A"],
                    ["B", "B"],
                    ["C", "C"],
                    ["D", "D"],
                    ["E", "E"],
                    ["F", "F"],
                    ["G", "G"],
                    ["H", "H"],
                    ["I", "I"],
                    ["J", "J"],
                    ["K", "K"],
                    ["L", "L"],
                    ["M", "M"],
                    ["N", "N"],
                    ["O", "O"],
                    ["P", "P"],
                    ["Q", "Q"],
                    ["R", "R"],
                    ["S", "S"],
                    ["T", "T"],
                    ["U", "U"],
                    ["V", "V"],
                    ["W", "W"],
                    ["X", "X"],
                    ["Y", "Y"],
                    ["Z", "Z"]
                ]
            }
        ],
        "nextStatement": null,
        "colour": 20
    },
    {
        "type": "event_on_mouse_click",
        "message0": "When mouse clicked",
        "nextStatement": null,
        "colour": 20
    },
    {
        "type": "get_mouse_position",
        "message0": "Get mouse position",
        "output": "Object",
        "colour": 20
    },
    {
        "type": "draw_circle",
        "message0": "Draw circle at x: %1 y: %2 with radius %3",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RADIUS",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    },
    {
        "type": "draw_rectangle",
        "message0": "Draw rectangle at x: %1 y: %2 with width %3 and height %4",
        "args0": [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "WIDTH",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "HEIGHT",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    }
];

// Register the block definitions with Blockly
Blockly.defineBlocksWithJsonArray(definitions);

// Define the toolbox
const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "App",
            "colour": 160,
            "contents": [
                {
                    "kind": "block",
                    "type": "create_app"
                },
                {
                    "kind": "block",
                    "type": "set_app_property"
                },
                {
                    "kind": "block",
                    "type": "app_set_background"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Sound",
            "colour": 230,
            "contents": [
                {
                    "kind": "block",
                    "type": "play_sound"
                },
                {
                    "kind": "block",
                    "type": "sound_set_volume"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Math",
            "colour": 230,
            "contents": [
                {
                    "kind": "block",
                    "type": "math_add"
                },
                {
                    "kind": "block",
                    "type": "math_subtract"
                },
                {
                    "kind": "block",
                    "type": "math_multiply"
                },
                {
                    "kind": "block",
                    "type": "math_divide"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Logic",
            "colour": 210,
            "contents": [
                {
                    "kind": "block",
                    "type": "logic_compare"
                },
                {
                    "kind": "block",
                    "type": "logic_operation"
                },
                {
                    "kind": "block",
                    "type": "controls_if"
                },
                {
                    "kind": "block",
                    "type": "controls_repeat_ext"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Variables",
            "colour": 330,
            "contents": [
                {
                    "kind": "block",
                    "type": "variables_set"
                },
                {
                    "kind": "block",
                    "type": "variables_get"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Text",
            "colour": 160,
            "contents": [
                {
                    "kind": "block",
                    "type": "plaintext"
                },
                {
                    "kind": "block",
                    "type": "text_length"
                },
                {
                    "kind": "block",
                    "type": "plainnumber"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Drawing",
            "colour": 160,
            "contents": [
                {
                    "kind": "block",
                    "type": "draw_circle"
                },
                {
                    "kind": "block",
                    "type": "draw_rectangle"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Events",
            "colour": 20,
            "contents": [
                {
                    "kind": "block",
                    "type": "event_on_start"
                },
                {
                    "kind": "block",
                    "type": "event_on_key_press"
                },
                {
                    "kind": "block",
                    "type": "event_on_mouse_click"
                },
                {
                    "kind": "block",
                    "type": "get_mouse_position"
                }
            ]
        }
    ]
};

// Initialize the Blockly workspace
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    theme: Blockly.Theme.defineTheme('customTheme', {
        'blockStyles': {
            'colour_blocks': {
                'colourPrimary': '#ff5722'
            }
        }
    })
});

// Define Python code generation for the custom blocks
Blockly.Python['create_app'] = function(block) {
    var appName = block.getFieldValue('FIELD_NAME');
    return 'create_app("' + appName + '")\n';
};

Blockly.Python['set_app_property'] = function(block) {
    var property = block.getFieldValue('PROPERTY');
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
    return 'set_app_property("' + property + '", ' + value + ')\n';
};

Blockly.Python['play_sound'] = function(block) {
    var soundPath = block.getFieldValue('SOUND_PATH');
    return 'play_sound("' + soundPath + '")\n';
};

Blockly.Python['math_add'] = function(block) {
    var valueA = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_ADDITION) || '0';
    var valueB = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ADDITION) || '0';
    return valueA + ' + ' + valueB;
};

Blockly.Python['math_subtract'] = function(block) {
    var valueA = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_SUBTRACTION) || '0';
    var valueB = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_SUBTRACTION) || '0';
    return valueA + ' - ' + valueB;
};

Blockly.Python['math_multiply'] = function(block) {
    var valueA = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_MULTIPLICATION) || '0';
    var valueB = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_MULTIPLICATION) || '0';
    return valueA + ' * ' + valueB;
};

Blockly.Python['math_divide'] = function(block) {
    var valueA = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_DIVISION) || '0';
    var valueB = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_DIVISION) || '0';
    return valueA + ' / ' + valueB;
};

Blockly.Python['controls_if'] = function(block) {
    var condition = Blockly.Python.valueToCode(block, 'IF0', Blockly.Python.ORDER_NONE) || 'False';
    var statements = Blockly.Python.statementToCode(block, 'DO0');
    return 'if ' + condition + ':\n' + statements;
};

Blockly.Python['controls_repeat_ext'] = function(block) {
    var times = Blockly.Python.valueToCode(block, 'TIMES', Blockly.Python.ORDER_NONE) || '10';
    var statements = Blockly.Python.statementToCode(block, 'DO');
    return 'for _ in range(' + times + '):\n' + Blockly.Python.prefixLines(statements, '    ');
};

Blockly.Python['variables_set'] = function(block) {
    var variable = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    return variable + ' = ' + value + '\n';
};

Blockly.Python['variables_get'] = function(block) {
    var variable = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return [variable, Blockly.Python.ORDER_NONE];
};

Blockly.Python['plaintext'] = function(block) {
    var text = block.getFieldValue('TEXT');
    return '"' + text + '"';
};

Blockly.Python['plainnumber'] = function(block) {
    var number = block.getFieldValue('NUMBER');
    return number;
};

Blockly.Python['logic_compare'] = function(block) {
    var valueA = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_RELATIONAL) || '0';
    var valueB = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_RELATIONAL) || '0';
    var operator = block.getFieldValue('OP');
    var operatorMapping = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    var op = operatorMapping[operator];
    return valueA + ' ' + op + ' ' + valueB;
};

Blockly.Python['logic_operation'] = function(block) {
    var valueA = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_LOGICAL_AND) || 'False';
    var valueB = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_LOGICAL_AND) || 'False';
    var operator = block.getFieldValue('OP');
    var op = operator === 'AND' ? 'and' : 'or';
    return valueA + ' ' + op + ' ' + valueB;
};

Blockly.Python['general_print'] = function(block) {
    var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || '""';
    return 'print(' + value + ')\n';
};

Blockly.Python['sound_set_volume'] = function(block) {
    var volume = block.getFieldValue('VOLUME');
    return 'set_volume(' + volume + ')\n';
};

Blockly.Python['text_length'] = function(block) {
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || '""';
    return 'len(' + text + ')';
};

Blockly.Python['app_set_background'] = function(block) {
    var color = block.getFieldValue('COLOUR');
    return 'set_background_color("' + color + '")\n';
};

Blockly.Python['event_on_start'] = function(block) {
    return 'import scriptblocks';
};

// Function to generate and display Python code
function generatePythonCode() {
    if (Blockly.Python) {
        try {
            var code = Blockly.Python.workspaceToCode(workspace);
            document.getElementById('output').textContent = code;
            console.log(code);
        } catch (e) {
            console.error('Code generation error:', e);
        }
    } else {
        console.error('Python generator not found.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generateCodeButton');
    if (button) {
        button.addEventListener('click', generatePythonCode);
    }
});
