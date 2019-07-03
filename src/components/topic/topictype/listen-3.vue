<template>
  <div>
    <el-tag type="warning" class="title" style="width:500px;">
      Listen to the programme and complete the table
    </el-tag>
    <el-button @click="viewAnswer" size="small">查看答案</el-button>
    <table cellspacing="0" cellspadding="0" border="0" :id='detailW.id'>
      <tbody v-html="html" class="listen-3-border">

      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
  .title {
    color: #000;
  }

  table {
    border-collapse: collapse;
    margin-top: 64px;
  }

</style>
<style lang="scss">
  input {
    border: none;
    width: 80px;
    text-align: center;
    border-bottom: 1px solid #000;
  }

  .listen-3-border {
    tr {
      td {
        border: 1px solid #ccc;
        width: 240px;
        height: 100px;
        padding-left: 5px;
      }
    }

    tr:first-child {
      td {
        width: 240px;
        height: 38px;

      }

    }

  }

</style>


<script>
  export default {
    data() {
      return {
          detailW:{
            id:456,
            steam: [
            "1.1 Expression", "1.2 Meaning", "1.3 Explanation", "2.1 ___1___",
            "2.2 A term for a ___2___ man or woman",
            "2.3 Look at this person is a treat for ___3___, just like candy is a treat for the tongue.",
            "3.1 A kid in a candy store",
            "3.2 A person is very ___4___ and happy to do something or to simply be somewhere.",
            "3.3 Like a(n) ___5___ and joyful kid walking from one candy display to the next, ___6___ which candy to choose.",
            "4.1 As easy as taking candy from a ___7___",
            "4.2 Talking about something that you may do easily, but ___8___.",
            "4.3 It would be very easy to take ___9___ from a small, helpless baby, but such ___10___ is heartless.",
            ],
            correct: ["good", "name"],
          },
        
        str: '',
        first: '',
        last: '',
        index: 0,
        html: '',
        arr: [],
        Arr:[]
      }
    },
    created() {
      
      this.PinJie(this.Arr);

    },
    beforeUpdate(){

    },
    methods: {
      // fnInit() {

      //   this.str = this.item.steam[this.item.steam.length - 1].split(" ")[0]
      //   this.first = this.str.split(".")[0] //最大行数
      //   this.last = this.str.split(".")[1] //最大列数

      //   this.item.steam.forEach(element => {
      //     this.arr.push(element.substring(element.indexOf(" ") + 1));
      //   });
      //   var f = 0;
      //   for (let i = 0; i < this.first; i++) { //3 6
      //     var tr = '<tr>'
      //     for (let j = 0; j < this.last; j++) {
      //       var td = '<td>' +
      //         this.arr[this.index].replace(/___\d+___/g, function (v) {
      //           f++
      //           return '<input type="text" class="line" value="' + f + '"/>'
      //         }) +
      //         '</td>'
      //       tr += td
      //       this.index++
      //     }

      //     tr += '</tr>'
      //     this.html += tr
      //   }

      // },
      viewAnswer () {
        var lineList = document.getElementById(this.detailW.id).querySelectorAll('.line');
        for (let index = 0; index < lineList.length; index++) {
          lineList[index].value = this.detailW.correct[index];
        }
      },
      look() {
 
        let that = this
        var arr2 = [];
        for (let index = 0; index < this.arr.length; index++) {

          var a = this.arr[index].replace(/(_)+(\d)?(_)+/g, function (a) {

            return that.correct[0]
          });
          arr2.push(a);
        }

        that.Arr = arr2;
        this.PinJie(that.Arr);

      },
      //拼接html的方法
      PinJie(arr) {
        this.str = this.detailW.steam[this.detailW.steam.length - 1].split(" ")[0]
        this.first = this.str.split(".")[0] //最大行数
        this.last = this.str.split(".")[1] //最大列数

        this.detailW.steam.forEach(element => {
          arr.push(element.substring(element.indexOf(" ") + 1));
        });
        var f = 0;
        for (let i = 0; i < this.first; i++) { //3 6
          var tr = '<tr>'
          for (let j = 0; j < this.last; j++) {
            var td = '<td>' +
              arr[this.index].replace(/___\d+___/g, function (v) {
                f++
                return '<input type="text" class="line" value="' + f + '"/>'
              }) +
              '</td>'
            tr += td
            this.index++
          }
          tr += '</tr>'
          this.html += tr
        }
      },
      

    }
  }

</script>
