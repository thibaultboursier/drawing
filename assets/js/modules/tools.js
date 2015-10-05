App.Tools = (function () {
    'use strict';

    var tool = document.getElementsByClassName('tool'),
        size = document.getElementsByClassName('size'),
        color = document.getElementsByClassName('color'),
        loading = document.getElementById('loading'),
        save = document.getElementById('save'),
        tool_len = tool.length,
        size_len = size.length,
        color_len = color.length,
        i = 0,
        j = 0,
        k = 0,
        tempTool,
        currentTool,
        tempSize,
        currentLineWidth,
        tempColor,
        currentStrokeStyle;

    // tool
    var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        dataURL,
        icon;

    // icons
    var icons = {
        'pencil': '\uf040',
        'eraser': '\uf12d'
    };

    function init (_this) {

        showInstructions();

        loading.classList.add('inactive');

        for (i; i < tool_len; i++) {
            tool[i].onclick = function (e) {
                e.stopPropagation();
                changeTool(this);
            }
        }

        for (j; j < size_len; j++) {
            size[j].onclick = function (e) {
                e.stopPropagation();
                changeLineWidth(this);
            }
        }

        for (k; k < color_len; k++) {
            color[k].onclick = function (e) {
                e.stopPropagation();
                changeStrokeStyle(this);
            }
        }

        save.onclick = function (e) {
            App.Canvas.saveCanvas();
        };

    }

    function showInstructions () {
        return (function () {
            var timer = 0,
                blocks_instructions = document.getElementsByClassName('instruction'),
                blocks_instructions_len = blocks_instructions.length,
                blocks_arr = [],
                show_time = 4000,
                i = 0,
                y = 0,
                instruction_a,
                instruction_b,
                popin,
                instruction_text,
                instruction_index,
                template,
                currentBlock,
                currentPopin;

            function getTemplate (index, text) {
                return '<div class="wrapper">' +
                    '<div class="arrow"></div>' +
                    '<p>' +
                    '<span class="index">' + index + '</span>' +
                    '<span class="text">' + text + '</span>' +
                    '</p>' +
                    '</div>';
            }

            function insertBlock (y) {
                setTimeout(function () {
                    var index;

                    (function () {
                        if (y === 0) {
                            return;
                        }

                        currentPopin.classList.remove('active');
                        currentBlock.classList.remove('active');
                    })();

                    if (y === blocks_arr.length) {
                        return;
                    }

                    instruction_text = blocks_arr[y].getAttribute('data-instruction-text');
                    instruction_index = blocks_arr[y].getAttribute('data-instruction-index');

                    template = getTemplate(instruction_index, instruction_text);

                    popin = document.createElement('div');
                    popin.setAttribute('class', 'popin instruction');
                    popin.setAttribute('data-instruction', instruction_index);
                    popin.innerHTML = template;

                    blocks_arr[y].appendChild(popin);

                    currentPopin = popin;
                    currentBlock = blocks_arr[y];

                    currentPopin.classList.add('active');
                    currentBlock.classList.add('active');

                }, y * 4000);
            }

            for (i; i < blocks_instructions_len; i++) {
                if (blocks_instructions[i].nodeType == 1) {
                    blocks_arr.push(blocks_instructions[i]);
                }
            }

            blocks_arr.sort(function(a, b) {
                instruction_a = a.getAttribute('data-instruction-index');
                instruction_b = b.getAttribute('data-instruction-index');

                return instruction_a == instruction_b ? 0 : (instruction_a > instruction_b ? 1 : -1);
            });

            for (y; y < blocks_arr.length + 1; y++) {
                insertBlock(y);
            }

        })();
    }

    function changeTool (tool) {

        tempTool = tempTool || tool;

        tempTool.classList.remove('active');

        tempTool = tool;
        tempTool.classList.add('active');

        icon = icons[tool.getAttribute('data-icon')];
        currentTool = tool.getAttribute('data-icon');

        canvas.width = 74;
        canvas.height = 74;

        ctx.fillStyle = "#000";
        ctx.font = "3.4em FontAwesome";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(icon, 20, 20);

        dataURL = canvas.toDataURL('image/png');

        setCursor();
    }

    function setCursor () {
        document.getElementsByTagName('body')[0].style.cursor = 'url(' + dataURL +') -1 32, auto';
    }

    function changeLineWidth (size) {

        var width = size.getAttribute('data-size');

        tempSize = tempSize || size;

        tempSize.classList.remove('active');

        tempSize = size;
        tempSize.classList.add('active');

        switch (width) {
            case 'small':
                width = 3;
                break;
            case 'medium':
                width = 20;
                break;
            case 'large':
                width = 50;
                break;
        }

        currentLineWidth = width;

        setCursor();
    }

    function changeStrokeStyle (color) {

        var style = color.getAttribute('data-color');

        tempColor= tempColor || color;

        tempColor.classList.remove('active');

        tempColor = color;
        tempColor.classList.add('active');

        currentStrokeStyle = style;
    }

    function getCurrentTool () {
        return currentTool;
    }

    function getCurrentLineWidth () {
        return currentLineWidth;
    }

    function getCurrentStrokeStyle () {
        return currentStrokeStyle;
    }

    return {
        init: init,
        showInstructions: showInstructions,
        changeTool: changeTool,
        changeLineWidth: changeLineWidth,
        getCurrentTool: getCurrentTool,
        getCurrentLineWidth: getCurrentLineWidth,
        getCurrentStrokeStyle: getCurrentStrokeStyle
    }
})(App);
