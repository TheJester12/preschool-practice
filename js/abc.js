//Vue.use(VueHammer);

// Vue.directive("pan", {
//     bind: function (el, binding) {
//         if (typeof binding.value === "function") {
//             const mc = new Hammer(el);
//             mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
//             mc.on("pan", binding.value);
//         }
//     }
// });

// Vue.directive("tap", {
//     bind: function (el, binding) {
//         if (typeof binding.value === "function") {
//             const mc = new Hammer(el);
//             mc.on("tap", binding.value);
//         }
//     }
// });
//https://lisilinhart.info/posts/touch-interaction-vue/
//https://codepen.io/lisilinhart/pen/wxRQBo

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
        },
        randomize: function () {
            this.createArray();
        },
        changeArray: function(type) {
            this.currentArray = type;
            this.visibleArray = [];
            var tempShuffled = this.shuffle(this[this.currentArray]);
            tempShuffled.forEach(function (element) {
                this.visibleArray.push({character: element, visible: true})
            }, this);
        },
        showNewSingleLetter: function() {
            var arrayLength = this[this.currentArray].length - 1;
            if (this.singleModeIndex < arrayLength) {
                this.singleModeIndex++;
            } else {
                this.shuffle(this[this.currentArray]);
                this.singleModeIndex = 0;
            }

        },
        hideSingleLetter: function (character) {
            character.visible = false;
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