// 确定是否已经安装了node.js   node-v
// 初始化项目 （安装package.json文件） npm init
// 安装ladash模块

const lodash = require("lodash");
const arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push(i);
}
const test_arr = lodash.shuffle(arr);

// 做一个小根堆
function headify(arr, n, i) {
  // n 代表length, i代表根节点
  let smallist = i;
  let lson = 2 * i + 1;
  let rson = 2 * i + 2;

  if (lson < n && arr[smallist] > arr[lson]) {
    smallist = lson;
  }
  if (rson < n && arr[smallist] > arr[rson]) {
    smallist = rson;
  }
  if (smallist !== i) {
    [arr[smallist], arr[i]] = [arr[i], arr[smallist]];
    // 保持堆的特性
    headify(arr, n, smallist);
  }
}

function topk(arr, k) {
  // 建堆
  const slice_arr = arr.slice(0, k);
  for (let i = (k - 2) >> 1; i >= 0; i--) {
    headify(slice_arr, k, i);
  }

  // 数组剩下的元素 和arr[0]进行对比（小根堆，第一个肯定是最小的），比他大就赋值给他
  for (let j = k; j < arr.length; j++) {
    if (arr[j] > slice_arr[0]) {
      slice_arr[0] = arr[j];
    }
    // 重排
    headify(slice_arr, k, 0);
  }

  // 让他变成有序的 比如热搜榜 或者前几名 依次显示这种
  for (let s = k - 1; s >= 0; s--) {
    [slice_arr[0], slice_arr[s]] = [slice_arr[s], slice_arr[0]];
    headify(slice_arr, s, 0);
  }

  return slice_arr;
}
console.log(topk(test_arr, 10));
