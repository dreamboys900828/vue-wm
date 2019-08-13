<template>
  <!--我的余额组件-->
    <div class="MyBalance">
      <lnavigation></lnavigation>
      <div class="header">
        <!--头部白色区域-->
        <div class="header_content">
          <p>
            <span>当前余额</span>
            <router-link :to="{path:'/balanceExplain'}" class="explain">余额说明</router-link>
            <svg t="1564729364049" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1169" width="14" height="14"><path d="M512.01357 0c282.829128 0 512.019284 229.201583 512.019284 511.992144 0 282.780562-229.184442 512.007856-512.019284 512.007856C229.240151 1024 0 794.776991 0 511.992144 0 229.224438 229.240151 0 512.01357 0L512.01357 0zM545.850219 688.341819c0.56423-32.283945 2.818292-55.640203 6.717906-69.998781 3.922469-14.382861 9.870451-27.078746 18.001074-38.154792 8.0792-11.051762 25.281782-28.284341 51.590604-51.590604 39.17612-34.689421 65.540651-64.179357 78.976463-88.411243 13.485807-24.2276 20.205142-50.714977 20.205142-79.40642 0-49.666509-19.128105-91.972319-57.438596-126.974566-38.304777-34.996534-89.589697-52.511941-153.901899-52.511941-60.7197 0-109.564862 16.309813-146.514059 48.896585-36.872062 32.613912-59.151284 79.590688-66.567692 140.896044l82.956069 9.870451c7.180717-45.765467 22.334931-79.40642 45.356936-100.972856 23.027719-21.509298 51.742018-32.283945 86.158609-32.283945 35.537908 0 65.66921 11.901678 90.208208 35.665039 24.511858 23.770503 36.76493 51.38491 36.76493 82.798942 0 17.33114-4.179586 33.356696-12.588753 47.998103-8.307749 14.691402-26.537371 34.355169-54.5146 58.99987C543.339039 497.824975 523.926676 516.6174 513.157742 529.49041 498.489195 547.134377 487.875961 564.648357 481.313754 582.008066c-8.977682 23.022005-13.464381 50.407864-13.464381 82.094726 0 5.390895 0.128559 13.492949 0.435671 24.261883L545.850219 688.341819 545.850219 688.341819zM555.313567 850.324346l0-92.000887L463.329821 758.323458l0 92.000887L555.313567 850.324346 555.313567 850.324346zM555.313567 850.324346" p-id="1170" fill="#3190e8"></path></svg>

          </p>
          <!--白色区域中间金额部分-->
          <div class="num">
            <span>0.00</span>
            <span>元</span>
          </div>
            <button>提现</button>
        </div>
      </div>
      <!--交易明细-->
      <p class="detail">交易明细</p>
      <!--图片和暂无明细记录-->
      <div class="footer">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACqCAMAAAAgPYI2AAADAFBMVEVMaXHt+/7x+f/y+f/y+f/y+P/x+P/w8P/t9fzy+f+36v/y+P/y+f/b7vdmvP/z+//u+fvy+f/y+f9nvP/w+f9ovP/x7fba5Opov//W5PDa5e7a5OpnvP9ku///1aH/0pTy+f/y+f9mu//a4+nN4PHa5Ord6fJnvf9nvP/j6vfa5OrZ4+ltwv+Tzv3w+P7R4vDX4+zZ5Oplu//h6/HI4PRgs/8tm/1rvv/y+P/H4PVouf9mvP/D3PJkuP0qmPxnvP9pvv9ovP9huP/y+P9nvP/i6/DF3vJTr/7a4+ra5Ora5Oo3nvsnl/womPwnlvtluv//2JUmmP5lu//y+f9nvf//1aJApv1Psf7Y4uhQrv3/1qNHqPoikPEql/j99uXe7frI3/RKq/3I3vT/1aIHeN1Dtv8ml/ylzvG9y8R1uPT/1aFTuv/BzcdIqf3/15prvv6PyvmOy/vu9v3o8fjy+f9nvP8tmvw6ofzJ4PTa5Or2/P/0+v/4/P/5/f////9ovf/I4PTX4efD3PIklf1pvf/t9/4qmf3E3fPk8Pvs9f7O4/bx+v9rvv/V5/fn7/XC3PLI3/RuwP/P5PbD3fJmvP/z+/85of07ov1sv/81n/w4oPxvwf/o8PYum/1ku/9fuP//1qLd7PnY4+g/pf1juv9Ss//G3vNOsf9guf/7/v8znfzo8/0wnv/B2/Iciu/9/v9Ytf9Vtf85oPwxnPy+2fHx/v9at//1+/8Sft/x+P90w/87ofzp8fdct/+CyP9Rr/4nl/33+/9ftvxFqP1Kr///1p7m8vyd0/7Z7//o9v9ctf2v3P98xf+Nzf5Erf9Wsv7f7vr26den2f/f8v+X0f7/25LB5P////7L4vW74f8Zkv3R6/9MrP7a6/kej/a13/9Ktv/z9vf/z416xv93wv6Mw+fM6P+4ys327uPI5/5mvP7++up5ufEAc98Lg/FYsPieye7+1qVGpPTG5v/r7OpXpu3+/PX55swVg+Y3p/4xlezrz6X+2Kj3/P7K4vfW5vRBUQnyAAAAdHRSTlMAD6zkqWxyAQjpAnaxC9dnE3+2vsDJBdEMVZrIfzSm/rO7jtYufCVl4hu9qxP+K1+0jVM49AjNbnpKGKt+PLqy70ekpndDPitvZ+1D5Y9g9ox4z4oiYrbE459O9tH/1a2k5JW55ZT3zOPwgNyljJP4/mPredc9C6oAAArySURBVHja7dt7XFPXAcDxw9YVmhV1o9CK2K5W8f2uc9VqH+vDPqxt13e77t29/8uJWUJuirkEkajE3q6BmBupCQkgmkAkg4yAA+UNFq3WB1qtc1X7ts9t/Xx27r2HELjB3H4at+Xe8/3Ih5CPf/0+557cc84NIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIJJbKhiSOx8Ql24ViTVzwU8BIWlYgdRbyMAiiP+prLRUQEibuVLTswAxVp5Rn4dkWMW5X8CyVICQNrBSs8j1Jz0bGVdxkVmKjKj/Zqv0FEBIvQjT0wFBEMT/ldQRv1UpKpC6mJvXU9LB1J9fOX78+G9FG8/D717J+XbElTz85g843xk2UUat0lJShd/pAGTlpqH308DUmwv3GdSJcmOWfGJl4TWi8ANUKtSqpGJfnjphfiTX6zKLa6VNbKxvpgI5mjAvjWuV6FhpQI7mzQP33KwlsSS6p0JLYkltpdWSWBLdoiWxJGwu41YkVlwTsnCryxQrHcjHvJmAM1Eb8WLFeh2JFUvuPNyKxIorbYLQqmRkLHIZimXNFOar7MIXSax4Zt4NOD8pLNGSWPGkpQnjqkJLYkmQDsCtaFxdxlhXpQAZwPtZt2pf1I6KVbjeQGLFciuqQ2LFkhqnFY61mcSKjpWqEv6aH1gnVlNSFCSxhqlwrGsGBwfLRxusDqpJLLFrDHkjGHg6dSJjTQAycaN6LHoSS2KshqAhaNCTWJJiBQs2btkf5GrpdVLpZR/rmjEuwQ2BzYFydP+gW79lo0RFQWXGMqyv0WoL30DRKssDmyWpCVQbFBprX02JtmaDHsXaHyiUZF1NdZ5CL8PgxkDgJW4jXl+0XqoCvezvs9Rj1Fo/WKQTPhal0qsVFwvTGyp15A5eYiyy3InhRhKLxCKx5B9Lf1U6kInvqi+nPRRyFSCx4gpS1J6OQwPtczOfzFg+ZfrkJSTWGBryqF3HBnq8bo/b3URDzow7F6lILLEGPbXrUNjn8XsZGG1czhyQxL53WVrtos72eNwsFJuxlMQaicprd7sZGFvmvSBZXa1OOD11wN7mouGYppNYw62O1XuM8FJySCyMOuv20/DSppBYPOqY20fDeHJILPQ5SHV60bhivSy8tEUkljqPCnto6KIboQte2jISi+pug5C19B7stcQZW5nJGCuR28oN1D5nE4TecPvc9rBXfhfi1WMeWJQX6IRXeonQ/6UOttEoVg+K1RMv1u0qucQKDtYEKqq/6tiiDjRxiVgYnhtmWBjHdBksd/AhawU6ZA3q0dm0doM0b1TnUe1tRoiwLtrFwnjGySCW6Pj+JUlqaqoptb0e8hiWgfGtkEesoPqNwLpAeR7Ktr+mRJKKwmrqoj/SiLZwaCMtYoRDpshkP0tXsHFDeZCbswuqiyRqoNo9UGCzGRmGYVmjRcRms9qgYJwsYiE6HX6YTa+TzBD2Q4SxWLtatwte+bPIK8dddiMDOY8lW6zEPSa5q9PihIjF1lxaVyqoazGJOfqtNOQsUu62MnXM6eJmK+txTdlarEoTg8nUbIecuxQc66KP5ear/qpIq1JNTC3mLhue4RUb6wi3lWxhQ6U4VShUZ9bEZGq1QuROZe7B41jcwHKWlg3FKtWMwbSdj7WcxCrDsUK1jkvEMjIMXK7cLRrqkJ/BsUbN7g6HI+bIulPBsc7Ws9GXYRkuw833taWOGLGmKDhWh8sbFasWDywHmuhDa0NloljJt+/wDXXCVDY01kfFwnXMVSF+AltbJ461Qrmx9FSvOypWFb5tqA0JA00ca811SoyFUd0eYyRWCMcqFVqFYsTKAEqO1dHkGo5VqjFrzPgiRMocolhLlRxrT2XYHTVnVTk0jtIQjhWqEk/wy5Qcq4E64omKhf7V4lTch6Eo1m1AmbGwSrXVZ3NG1tF4VOFVoijWZJBsrlAnEnWyDcfCxKvESKwMoPBYeYYzPm9p7draUa3W1plFsR5LwlgJ/aJTA3XM5ysbWu7EHlg4Vg6QRyx8Il30VU+kET3V3YdGFlIb4qLhgeUQxcoEsoklPpGW/kR32CTEwqXw/Wk0R53p2TkyiYW/9otPpPdrt0iyYUuBjr8Q1a1H8adg7Vj7Wua6B4AMYolPpAcD6ySpWVekwzs1pUdDoehYVaNSmapQKxnEEp9Il0s9kS5BsfCqp/VoGaoVe8ZytJh+NhnII5b4RLpIqgY1RjWc0dSNMWOZTS88PQcka6zEnUjrhyb5PVRH/ytVdWWihQ5K1bL9UZC0rkjIiXTxbqwYDa8gdbLJaOtqLaurKsP3o7iUydHaZbfepgKYIteGLxe//Zrg1O4GNXXOXw9pq9Xb3BpCB/gmQUuLhnvKwQ4ZZrmSYxUXf3b6Bt7pf58qrixo9BshYrNbXL7+5lbuIZHW1uP9TovdBnl3AACyfne94HFlxdp96oa92wSnP9tNdbtZKDBarIjdyrPb6Ohn/q7fNuRxZY2sU9tO7+W9fvptg/otHxyB9bpiPKl8QyTWL5Q1Z+1++8O927hY/3rNQF30RbehWY+PdXp8NIw2A4CHX+ft/XDbM8qJhS/ECx//Helqp4q4gcUM9aLrPQc70bdabZ5ILSP6YaYD8Id/IL95+OFnFLdTWryrk3nT76+3tPfUQ2hxdlkgz+s+RxUcOkZ92YNrGV0uvlbO9N+/ifxKkZt/eeqwD0La5a/nH9FqtkEO3dZNDXj6dtiow9Z64R2nj+/IeFmILFVkrCB3woowELE141jO84c7+vye3s7DF61NkGPpaqbhsMkKi4WhEQSH2I7jWP7w4bl99g6qoOcLv0WI5Ww2Rk/0Co3V4WsayuBt7R+O9UXvywNt7gPd7kis4VqLlBgLbygLtdi2g2fabEI1ljrQ53N6PHTDgBCLdj05hU7Wr9H9UJ0AeK+hu97ja2pye8KVA200nuAHqG5Pn/vMeZ8Xv2N8AixdA3mPLlNkLLz93nGwp9EePkKhFQ8DeS7PEerLcx2Hj7SxkGe0PQHAsrsyZozLmA6AImNhFKXv7Kyk8qiTQ7Fop6f3wGH9yUYvxKxPA84SFQBKjYXp8yor96BoR/wMFNCMx3/e6WmyQMwyBWBKP5HGqLM+FkYwIxbSzF0k1qhYbjimySBpLdarE2/XPm8fax/C1DOR142Nty8BySpt1VbdZUB1tNu7uv7G6zp/hkYvee8/+/S9IGlNyM/ftJXz1xG28jZhW0fbFNenn37y7l8E775z4R30WvBLkMwmrJr9VH5+/quj5Yvg96V59eNP3tspeO+DCx+g14LnQJJLy504LXvWTff/KZE+fufoDp7ZHHj+1ybHDsH3gTyk5C6eeN+0hdkLJl371P35Xy/Vq/c//9ujGsELKwB4UIOhWHKjSpmZO3Xx3RPn37dq2rSFC7OzZ8+evWDWrFmTJk26FrmJx72ahMyatWDB7NnZ2QsXTpu26r75E+9ePDV3ZgpY3YL7PLgEgJXDsYgYHqkzmzUOB+qjAmC1BuEuRRIrpofQGbTphHmHZiX3B2rVcuLEzp0rARHDI9v7+5trd57YsRr9ca/GbPpx6KOP/vkcIMRW3N5oRTfs739+4hFuEnywpdWFbt/tzhxAjDZnzdxeJ4T0W+9//hBAVjZbe3tdDG2lSS2R2xiLhYGQYRq7HgDIH+3GMz0sZPiFNDHCZAhZFvKsSwGSQ0OXF/LQSpqIdsejmZmZGZzMjDv4epkzxglmjJsDiDiuw5aBy+k/UN5KMAmB6lgAAAAASUVORK5CYII=" alt="">
        <p>暂无明细记录</p>
      </div>

    </div>


</template>

<script>
    import Lnavigation from "./Lnavigation";
    const packet = require("@/assets/img/bg-packet.png");
    export default {
        name: "MyBalance",
      components: {Lnavigation},
      data(){
          return{
            abc:"123",
            packet
          }
      },
      methods: {

      }
    }
</script>

<style scoped lang="less">
  .header{
    /*background: url("../../assets/img/bg-packet.png") top center repeat-X;*/
    /*border-radius: 0.05rem;*/
    width: 100%;
    height: 1.58rem;
    background: #3190e8;
    padding: 0.07rem;
    .header_content{
      padding-top: 0.1rem;
      box-sizing: border-box;
        width: 3.6rem;
        height: 1.57rem;
      border-radius: 0.05rem;
      padding: 0.09375rem;
      background: white;
      /*当前余额 余额说明*/
      p{
        width: 3.424rem;
        height: 0.168rem;
        span{
          float: left;
          font-size: 0.128rem;
          color: #666;
        }

        .explain{
          float: right;
          font-size: 0.128rem;
          color: #3190e8;
        }
        .icon{
          /*width: 0.14rem;*/
          float: right;
        }
      }
      /*金额 /元*/
      .num{
        width: 3.424rem;
        height: 0.512rem;
        line-height: 0.512rem;

        >span:nth-child(1){
          font-size: 0.421rem;
        }
      }
      /*提交按钮*/
      button{
        width: 3.424rem;
        height: 0.4687rem;
        margin-top: 0.23438rem;
        border-radius: 3px;
        border: none;
        background: #ccc;
        color: white;
        font-size: 0.187rem;
      }
    }

  }

  /*交易明细*/
  .detail{
    width: 100%;
    height: 0.464rem;
    color: #666;
    font-size: 0.14rem;
    line-height: 0.464rem;
    padding-left: 0.117rem;
  }


  .footer{
    width: 100%;
    height: 1.57rem;
    /*background: wheat;*/
    margin-top: 0.2438rem;
    img{
      width: 1.875rem;
      height: 1.179rem;
      text-align: center;
      margin-left: 0.8rem;
    }
    p{
      margin-top: 0.11719rem;
      font-size: 0.164rem;
      color: #666;
      text-align: center;
      margin-left: -0.3rem;
    }
  }
</style>
