<script setup lang="ts">
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'

import {type Ref, ref} from 'vue'

//文章分类数据模型
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

//用户搜索时选中的分类id
const categoryId=ref(1)

//用户搜索时选中的发布状态
const state=ref('草稿')

//文章列表数据模型
type articleModel = {
  id: number,
  title: string,
  content: string,
  coverImg: string,
  state: string,
  categoryId: number,
  createTime: string,
  updateTime: string,
  categoryName?: string
}
const articles:Ref<Array<articleModel>> = ref([
  {
    "id": 5,
    "title": "陕西旅游攻略",
    "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    "coverImg": "",
    "state": "草稿",
    "categoryId": 1,
    "createTime": "2023-09-03 11:55:30",
    "updateTime": "2023-09-03 11:55:30"
  },
  {
    "id": 5,
    "title": "陕西旅游攻略",
    "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    "coverImg": "",
    "state": "草稿",
    "categoryId": 1,
    "createTime": "2023-09-03 11:55:30",
    "updateTime": "2023-09-03 11:55:30"
  },
  {
    "id": 5,
    "title": "陕西旅游攻略",
    "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
    "coverImg": "",
    "state": "草稿",
    "categoryId": 1,
    "createTime": "2023-09-03 11:55:30",
    "updateTime": "2023-09-03 11:55:30"
  },
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(3)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size:number) => {
  pageSize.value = size
  articleList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num:number) => {
  pageNum.value = num
  articleList()
}

import {articleAddService, articleCategoryListService, articleListService} from '@/api/article.ts'
import {type articleQueryParams} from '@/hooks/types.ts'

//回显文章分类列表
async function articleCategoryList() {
  await articleCategoryListService()
      .then(response => {
        categorys.value = response.data
      })
}
articleCategoryList()

//获取文章列表数据
async function articleList() {
  let params:articleQueryParams = {
    pageNum:pageNum.value,
    pageSize:pageSize.value,
    categoryId:categoryId.value,
    state:state.value
  }
  let result = await articleListService(params);
  //渲染列表数据
  articles.value = result.data.items
  //为列表中添加categoryName属性
  articles.value.forEach(
      (item) => {
        item.categoryName = categorys.value.find(
            (c) => c.id === item.categoryId
        )?.categoryName
      }
  )
  //渲染总条数
  total.value=result.data.total
}
articleList()


//添加文章
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {ElMessage} from "element-plus";
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const articleModel = ref({
  title: '',
  categoryId: '',
  coverImg: '',
  content:'',
  state:''
})

//添加文章
async function addArticle(state:string) {
  articleModel.value.state = state
  //调用添加文章接口
  let result = await articleAddService(articleModel.value)
  //提示信息
  ElMessage.success(result.message? result.message:'添加成功')
  //刷新文章列表
  articleList()
  //关闭抽屉
  visibleDrawer.value = false

}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>文章管理</span>
        <div class="extra">
          <el-button type="primary" @click="visibleDrawer = true">添加文章</el-button>
        </div>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <el-select placeholder="请选择" v-model="categoryId">
          <el-option
              v-for="c in categorys"
              :key="c.id"
              :label="c.categoryName"
              :value="c.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发布状态：">
        <el-select placeholder="请选择" v-model="state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="articleList">搜索</el-button>
        <el-button @click="categoryId=1;state='';">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 文章列表 -->
    <el-table :data="articles" style="width: 100%">
      <el-table-column label="文章标题" width="400" prop="title"></el-table-column>
      <el-table-column label="分类" prop="categoryName"></el-table-column>
      <el-table-column label="发表时间" prop="createTime"> </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary"></el-button>
          <el-button :icon="Delete" circle plain type="danger"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5 ,10, 15]"
                   layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
                   @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    <!-- 抽屉 -->
    <el-drawer v-model="visibleDrawer" title="添加文章" direction="rtl" size="50%">
      <!-- 添加文章表单 -->
      <el-form :model="articleModel" label-width="100px" >
        <el-form-item label="文章标题" >
          <el-input v-model="articleModel.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select placeholder="请选择" v-model="articleModel.categoryId">
            <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面">

          <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false">
            <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
<!--              <Plus />-->
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
          <div class="editor">
            <quill-editor
                theme="snow"
                v-model:content="articleModel.content"
                contentType="html">
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addArticle('已发布')">发布</el-button>
          <el-button type="info" @click="addArticle('草稿')">草稿</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
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
/* 抽屉样式 */
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>