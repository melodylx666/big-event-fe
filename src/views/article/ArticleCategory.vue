<script setup lang="ts">
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {
  articleCategoryAddService,
  articleCategoryDeleteService,
  articleCategoryListService,
  articleCategoryUpdateService
} from "@/api/article.ts";
import {ElMessage} from "element-plus";

const categorys = ref([
  {
    "id": 3,
    "categoryName": "美食",
    "categoryAlias": "my",
    "createTime": "2023-09-02 12:06:59",
    "updateTime": "2023-09-02 12:06:59"
  },
  {
    "id": 4,
    "categoryName": "娱乐",
    "categoryAlias": "yl",
    "createTime": "2023-09-02 12:08:16",
    "updateTime": "2023-09-02 12:08:16"
  },
  {
    "id": 5,
    "categoryName": "军事",
    "categoryAlias": "js",
    "createTime": "2023-09-02 12:08:33",
    "updateTime": "2023-09-02 12:08:33"
  }
])

// 声明获取文章分类列表方法并调用
async function articleCategoryList() {
  await articleCategoryListService()
      .then((response) => {
        categorys.value = response.data
      })
}

articleCategoryList()


//弹窗部分
//控制添加分类弹窗
const dialogVisible = ref(false)

import {categoryModel} from '@/hooks/types.js'
import type {Ref} from "vue";
//添加分类数据模型
const categoryModel: Ref<categoryModel> = ref({
  categoryName: '',
  categoryAlias: '',
  id: 0
})
//添加分类表单校验
const rules = {
  categoryName: [
    {required: true, message: '请输入分类名称', trigger: 'blur'},
  ],
  categoryAlias: [
    {required: true, message: '请输入分类别名', trigger: 'blur'},
  ]
}

//添加分类接口，参考后端与接口文档
async function addCategory() {
  console.log('here')
  await articleCategoryAddService(categoryModel.value)
      .then(response => {
        ElMessage.success(response.message ? response.message : '添加成功!')
        articleCategoryList()
        // 关闭弹窗
        dialogVisible.value = false
      })
}

//控制弹窗标题
const dialogTitle = ref('')

function showDialog(row) {
  dialogVisible.value = true
  dialogTitle.value = '编辑分类'
  //数据拷贝
  categoryModel.value.categoryName = row.categoryName
  categoryModel.value.categoryAlias = row.categoryAlias
  categoryModel.value.id = row.id //扩展数据id
}

//修改分类
async function updateCategory() {
  await articleCategoryUpdateService(categoryModel.value)
      .then(response => {
        ElMessage.success(response.message ? response.message : '修改成功!')
        articleCategoryList()
        // 关闭弹窗
        dialogVisible.value = false
      })
}

//确认按钮
function switchButton() {
  if (dialogTitle.value === '添加分类') {
    addCategory()
  } else {
    updateCategory()
  }
}

//清空数据
function clearData() {
  categoryModel.value.categoryName = ''
  categoryModel.value.categoryAlias = ''
  categoryModel.value.id = 1
}

import {ElMessageBox} from 'element-plus'
//删除分类
const deleteCategory = (row) => {
  ElMessageBox.confirm(
      '你确认删除该分类信息吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //用户点击了确认
        let result = await articleCategoryDeleteService(row.id)
        ElMessage.success(result.message?result.message:'删除成功')
        //再次调用getAllCategory，获取所有文章分类
        articleCategoryList()
      })
      .catch(() => {
        //用户点击了取消
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>文章分类</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible = true;dialogTitle='添加分类';clearData();">添加分类
          </el-button>
        </div>
      </div>
    </template>
    <el-table :data="categorys" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="categoryName"></el-table-column>
      <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click=showDialog(row)></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"/>
      </template>
    </el-table>
    <!-- 添加分类弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="categoryAlias">
          <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="switchButton"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>