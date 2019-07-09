
Vue.directive("pan", {
    bind: function(el, binding) {
        if (typeof binding.value === "function") {
            var mc = new Hammer(el);
            mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
            mc.on("pan", binding.value);
        }
    }
});

Vue.directive("tap", {
    bind: function(el, binding) {
        if (typeof binding.value === "function") {
            var mc = new Hammer(el);
            mc.on("tap", binding.value);
        }
    }
});

//https://lisilinhart.info/posts/touch-interaction-vue/

var app = new Vue({
    el: '#app',
    data: {
        alphabetUpper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        alphabetLower: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
        visibleArray: [],
        currentArray: 'alphabetUpper',
        mode: 'sheet',
        singleModeIndex: 0,
        colorPopup: false,
        currentColor: 'purple',
        colorsArray: ['purple','blue','orange','red','green'],
        randomKey: '45675768',
    },
    mounted: function () {
        this.createArray();
    },
    computed: {
        
    },
    methods: {
        createArray: function() {
            this.visibleArray = [];
            var tempShuffled = this.shuffle(this[this.currentArray]);
            tempShuffled.forEach(function (element) {
                this.visibleArray.push({ character: element, visible: true })
            }, this);
            this.randomKey = Math.random().toString(36).substr(2, 9);
        },
        randomize: function () {
            this.createArray();
        },
        changeArray: function(type) {
            this.currentArray = type;
            this.createArray();
        },
        showNewSingleLetter: function(event) {
            // var deltaX = event.deltaX; // moved distance on x-axis
            // var deltaY = event.deltaY; // moved distance on y-axis
            // var direction = event.direction; // 0 = none, 2 = left, 4 = right, 8 = up, 16 = down,
            var isFinal = event.isFinal; // pan released
            if (isFinal) {
                var arrayLength = this[this.currentArray].length - 1;
                if (this.singleModeIndex < arrayLength) {
                    this.singleModeIndex++;
                } else {
                    this.shuffle(this[this.currentArray]);
                    this.singleModeIndex = 0;
                }
            }
        },
        hideSingleLetter: function (event, character) {
            // var deltaX = event.deltaX; // moved distance on x-axis
            // var deltaY = event.deltaY; // moved distance on y-axis
            // var direction = event.direction; // 0 = none, 2 = left, 4 = right, 8 = up, 16 = down,
            var isFinal = event.isFinal; // pan released
            if (isFinal) {
                if (character.visible === false) {
                    character.visible = true;
                } else {
                    character.visible = false;
                }
            }
        },
        changeColor: function(event, color) {
            this.currentColor = color;
            this.colorPopup = false;
        },
        colorClass: function(color) {
            if (color === this.currentColor) {
                return color + ' active';
            } else {
                return color;
            }
        },
        shuffle: function (array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while(0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
    }
})