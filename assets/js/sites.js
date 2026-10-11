/* ==========================================================================
   sites.js — 站点清单（导航页唯一数据源）
   ---------------------------------------------------------------------------
   新增一个页面 = 在 SITES 里加一条记录 + 把 html 放进 sites/<slug>/index.html
   无需改动导航页本身。
   status: 'live' 已上线（可点击跳转） | 'planned' 规划中（占位，不可点击）
   layout: 决定缩略图形态  hero | split | grid | list | app | profile
   ========================================================================== */

/* ---------- 行业分类 ---------- */
const INDUSTRIES = [
  { id: 'construction',  name: '建筑装饰', glyph: '🏗️', tint: '#ea580c', note: '施工总包 · 设计院 · 家装 · 建材' },
  { id: 'realestate',    name: '房产家居', glyph: '🏙️', tint: '#0d9488', note: '楼盘 · 中介 · 物业 · 家居软装' },
  { id: 'finance',       name: '金融投资', glyph: '💹', tint: '#1d4ed8', note: '银行 · 证券 · 保险 · 理财' },
  { id: 'travel',        name: '旅游出行', glyph: '✈️', tint: '#0891b2', note: '旅行社 · 景区 · 酒店民宿' },
  { id: 'catering',      name: '餐饮美食', glyph: '🍜', tint: '#dc2626', note: '正餐 · 茶饮 · 烘焙 · 外卖' },
  { id: 'education',     name: '教育培训', glyph: '🎓', tint: '#7c3aed', note: 'K12 · 职教 · 语言 · 在线课' },
  { id: 'healthcare',    name: '医疗健康', glyph: '🩺', tint: '#0ea5e9', note: '医院 · 口腔 · 体检 · 药房' },
  { id: 'ecommerce',     name: '电商零售', glyph: '🛒', tint: '#db2777', note: '综合商城 · 品牌旗舰 · 跨境' },
  { id: 'manufacturing', name: '工业制造', glyph: '⚙️', tint: '#475569', note: '机械 · 电子 · 化工 · 五金' },
  { id: 'tech',          name: '科技互联网', glyph: '💻', tint: '#4f46e5', note: 'SaaS · 软件 · AI · 云服务' },
  { id: 'automotive',    name: '汽车服务', glyph: '🚗', tint: '#2563eb', note: '4S 店 · 二手车 · 美容养护' },
  { id: 'beauty',        name: '丽人医美', glyph: '💅', tint: '#c026d3', note: '美容 · 美发 · 美甲 · 医美' },
  { id: 'sports',        name: '运动健身', glyph: '🏀', tint: '#16a34a', note: '健身房 · 瑜伽 · 球馆 · 装备' },
  { id: 'wedding',       name: '婚庆摄影', glyph: '💒', tint: '#e11d48', note: '婚纱 · 婚庆策划 · 儿童摄影' },
  { id: 'media',         name: '文化传媒', glyph: '🎬', tint: '#9333ea', note: '广告 · 影视 · MCN · 活动' },
  { id: 'legal',         name: '法律服务', glyph: '⚖️', tint: '#0f766e', note: '律所 · 法务咨询 · 知识产权' },
  { id: 'logistics',     name: '物流运输', glyph: '🚚', tint: '#f59e0b', note: '快递 · 货运 · 仓储 · 供应链' },
  { id: 'agriculture',   name: '农林牧渔', glyph: '🌾', tint: '#65a30d', note: '农产品 · 生态农业 · 农机' },
  { id: 'energy',        name: '能源环保', glyph: '🔋', tint: '#059669', note: '光伏 · 储能 · 环保工程' },
  { id: 'maternity',     name: '母婴亲子', glyph: '🍼', tint: '#f472b6', note: '母婴商城 · 早教 · 亲子乐园' },
  { id: 'pet',           name: '宠物服务', glyph: '🐾', tint: '#a16207', note: '宠物医院 · 洗护 · 寄养' },
  { id: 'entertainment', name: '娱乐休闲', glyph: '🎮', tint: '#8b5cf6', note: '游戏 · 影咖 · 酒吧 · 剧本杀' },
  { id: 'government',    name: '政务公益', glyph: '🏛️', tint: '#b91c1c', note: '政务门户 · 社区 · 公益 · 党建' },
  { id: 'personal',      name: '个人作品', glyph: '👤', tint: '#334155', note: '个人主页 · 作品集 · 博客' },
];

/* ---------- 站点清单 ---------- */
const SITES = [
  /* ===== 已上线 ===== */
  {
    slug: 'construction-corp', title: '云筑建设集团', industry: 'construction',
    type: '企业官网', layout: 'hero', accent: '#ea580c', status: 'live',
    desc: '施工总包企业官网：工程业绩数字看板、资质荣誉、项目案例瀑布流。',
    tags: ['B 端官网', '数据看板', '案例墙'],
  },
  {
    slug: 'realestate-portal', title: '悦居置业 · 楼盘门户', industry: 'realestate',
    type: '资讯门户', layout: 'grid', accent: '#0d9488', status: 'live',
    desc: '在售楼盘检索门户：区域/价格/户型多维筛选、楼盘卡片、预约看房。',
    tags: ['筛选检索', '楼盘卡', '预约表单'],
  },
  {
    slug: 'finance-bank', title: '汇通银行 · 数字金融', industry: 'finance',
    type: '企业官网', layout: 'split', accent: '#1d4ed8', status: 'live',
    desc: '银行品牌官网：业务矩阵、利率速查、理财计算器、网点查询。',
    tags: ['金融机构', '计算器', '业务矩阵'],
  },
  {
    slug: 'travel-agency', title: '远行者旅行 · 线路商城', industry: 'travel',
    type: '电商商城', layout: 'grid', accent: '#0891b2', status: 'live',
    desc: '旅游线路电商：目的地聚合、行程时间轴、价格日历、在线下单。',
    tags: ['线路商城', '时间轴', '价格日历'],
  },
  {
    slug: 'catering-brand', title: '灶见 · 中式餐饮', industry: 'catering',
    type: '企业官网', layout: 'hero', accent: '#dc2626', status: 'live',
    desc: '餐饮品牌官网：招牌菜品图集、门店地图、加盟合作、在线点餐入口。',
    tags: ['品牌官网', '菜品图集', '门店'],
  },
  {
    slug: 'ecommerce-mall', title: '拾光集 · 综合商城', industry: 'ecommerce',
    type: '电商商城', layout: 'grid', accent: '#db2777', status: 'live',
    desc: '综合电商首页：主会场轮播、限时秒杀、商品瀑布流、购物车侧栏。',
    tags: ['商城首页', '秒杀', '购物车'],
  },
  {
    slug: 'tech-saas', title: '云枢 CloudHub', industry: 'tech',
    type: '企业官网', layout: 'split', accent: '#4f46e5', status: 'live',
    desc: 'SaaS 产品官网：产品截图演示、功能矩阵、定价方案、文档入口。',
    tags: ['产品官网', '定价表', '功能矩阵'],
  },
  {
    slug: 'personal-portfolio', title: '林清野 · 个人作品集', industry: 'personal',
    type: '个人主页', layout: 'profile', accent: '#334155', status: 'live',
    desc: '设计师个人主页：自我介绍、作品网格、时间线简历、联系方式。',
    tags: ['个人主页', '作品集', '时间线'],
  },

  /* ===== 规划中（占位，占好坑位，后续逐个填充） ===== */
  { slug: 'construction-design', title: '筑原设计院', industry: 'construction', type: '企业官网', layout: 'split', accent: '#f97316', status: 'planned', desc: '建筑设计院官网：设计理念、团队阵容、获奖项目。', tags: ['设计机构'] },
  { slug: 'construction-deco', title: '橙家装饰 · 家装套餐', industry: 'construction', type: '落地页', layout: 'hero', accent: '#fb923c', status: 'planned', desc: '家装公司获客落地页：套餐对比、免费报价表单。', tags: ['落地页', '表单获客'] },
  { slug: 'construction-mall', title: '筑材优选 · 建材商城', industry: 'construction', type: '电商商城', layout: 'grid', accent: '#c2410c', status: 'planned', desc: '建材垂直电商：品类导航、规格筛选、批量询价。', tags: ['垂直电商'] },

  { slug: 'realestate-agent', title: '安居中介 · 二手房', industry: 'realestate', type: '电商商城', layout: 'list', accent: '#14b8a6', status: 'planned', desc: '二手房交易平台：房源列表、地图找房、经纪人主页。', tags: ['列表检索', '地图'] },
  { slug: 'realestate-property', title: '悦邻物业 · 社区服务', industry: 'realestate', type: '移动端', layout: 'app', accent: '#0f766e', status: 'planned', desc: '物业管理移动端：报修、缴费、访客、公告四宫格。', tags: ['移动端', '社区'] },
  { slug: 'realestate-furniture', title: '木言家居 · 软装', industry: 'realestate', type: '电商商城', layout: 'grid', accent: '#0891b2', status: 'planned', desc: '家居品牌商城：场景化选品、3D 空间预览。', tags: ['场景电商'] },

  { slug: 'finance-securities', title: '恒泰证券 · 行情中心', industry: 'finance', type: '资讯门户', layout: 'list', accent: '#2563eb', status: 'planned', desc: '券商行情门户：指数看板、涨跌榜、研报资讯流。', tags: ['行情', '红涨绿跌'] },
  { slug: 'finance-insurance', title: '安和保险 · 产品中心', industry: 'finance', type: '企业官网', layout: 'split', accent: '#0ea5e9', status: 'planned', desc: '保险产品官网：险种分类、保额试算、理赔流程。', tags: ['保险', '试算器'] },
  { slug: 'finance-fund', title: '稳盈基金 · 定投', industry: 'finance', type: '落地页', layout: 'hero', accent: '#6366f1', status: 'planned', desc: '基金定投获客页：收益曲线模拟、风险提示。', tags: ['落地页', '图表'] },
  { slug: 'finance-dashboard', title: '资产配置后台', industry: 'finance', type: '后台管理', layout: 'app', accent: '#1e40af', status: 'planned', desc: '理财后台：资产总览、持仓明细、收益报表。', tags: ['后台', '图表'] },

  { slug: 'travel-scenic', title: '云台山景区官网', industry: 'travel', type: '资讯门户', layout: 'hero', accent: '#06b6d4', status: 'planned', desc: '景区官网：景点地图、门票预订、游览路线推荐。', tags: ['景区', '地图'] },
  { slug: 'travel-hotel', title: '栖山民宿 · 预订', industry: 'travel', type: '电商商城', layout: 'grid', accent: '#0d9488', status: 'planned', desc: '民宿预订：房型日历、周边玩法、图文详情。', tags: ['民宿', '日历'] },
  { slug: 'travel-guide', title: '在路上 · 旅行攻略', industry: 'travel', type: '资讯门户', layout: 'list', accent: '#0891b2', status: 'planned', desc: '旅行内容社区：目的地攻略、游记瀑布流。', tags: ['内容社区'] },

  { slug: 'catering-tea', title: '茶小满 · 新式茶饮', industry: 'catering', type: '企业官网', layout: 'hero', accent: '#059669', status: 'planned', desc: '茶饮品牌官网：菜单、门店、会员、小程序点单。', tags: ['品牌官网', '菜单'] },
  { slug: 'catering-bakery', title: '麦野烘焙 · 商城', industry: 'catering', type: '电商商城', layout: 'grid', accent: '#d97706', status: 'planned', desc: '烘焙电商：蛋糕预订、配送时段、定制祝福。', tags: ['预订电商'] },
  { slug: 'catering-order', title: '扫码点餐移动端', industry: 'catering', type: '移动端', layout: 'app', accent: '#dc2626', status: 'planned', desc: '餐厅扫码点餐：菜品分类、购物车、下单。', tags: ['移动端', '点餐'] },

  { slug: 'education-k12', title: '启明教育 · K12', industry: 'education', type: '企业官网', layout: 'split', accent: '#7c3aed', status: 'planned', desc: 'K12 机构官网：课程体系、师资、试听预约。', tags: ['机构官网', '预约'] },
  { slug: 'education-online', title: '学而在线 · 课程平台', industry: 'education', type: '电商商城', layout: 'grid', accent: '#8b5cf6', status: 'planned', desc: '在线课程平台：课程卡片、讲师页、学习进度。', tags: ['课程平台'] },
  { slug: 'education-admin', title: '教务管理后台', industry: 'education', type: '后台管理', layout: 'app', accent: '#6d28d9', status: 'planned', desc: '教务后台：班级管理、排课表、学员档案。', tags: ['后台', '排课'] },

  { slug: 'healthcare-hospital', title: '仁和医院官网', industry: 'healthcare', type: '企业官网', layout: 'split', accent: '#0284c7', status: 'planned', desc: '医院官网：科室导航、专家排班、预约挂号。', tags: ['医疗', '挂号'] },
  { slug: 'healthcare-dental', title: '皓齿口腔 · 诊所', industry: 'healthcare', type: '落地页', layout: 'hero', accent: '#0891b2', status: 'planned', desc: '口腔诊所获客页：项目价格、案例对比、在线咨询。', tags: ['落地页', '咨询'] },
  { slug: 'healthcare-checkup', title: '康明体检 · 套餐', industry: 'healthcare', type: '电商商城', layout: 'grid', accent: '#0ea5e9', status: 'planned', desc: '体检套餐商城：套餐对比、加项选择、报告查询。', tags: ['套餐电商'] },

  { slug: 'ecommerce-brand', title: '白鹿 · 品牌旗舰店', industry: 'ecommerce', type: '电商商城', layout: 'grid', accent: '#be185d', status: 'planned', desc: '品牌旗舰店：系列陈列、详情页、搭配推荐。', tags: ['品牌店'] },
  { slug: 'ecommerce-fresh', title: '鲜到家 · 生鲜配送', industry: 'ecommerce', type: '移动端', layout: 'app', accent: '#16a34a', status: 'planned', desc: '生鲜到家：分类选品、凑单、配送时段。', tags: ['移动端', '生鲜'] },
  { slug: 'ecommerce-cross', title: '海淘汇 · 跨境', industry: 'ecommerce', type: '电商商城', layout: 'list', accent: '#7c3aed', status: 'planned', desc: '跨境电商：国家馆、关税说明、物流追踪。', tags: ['跨境'] },

  { slug: 'manufacturing-machine', title: '恒力机械 · 装备制造', industry: 'manufacturing', type: '企业官网', layout: 'split', accent: '#334155', status: 'planned', desc: '机械制造官网：产品参数表、技术优势、询价。', tags: ['工业官网', '参数表'] },
  { slug: 'manufacturing-electronics', title: '微芯电子 · 元器件', industry: 'manufacturing', type: '电商商城', layout: 'list', accent: '#475569', status: 'planned', desc: '电子元器件商城：型号检索、数据手册、批量报价。', tags: ['B 端电商'] },
  { slug: 'manufacturing-factory', title: '智慧工厂看板', industry: 'manufacturing', type: '后台管理', layout: 'app', accent: '#1e293b', status: 'planned', desc: '工厂生产看板：产能、良率、设备状态实时监控。', tags: ['数据看板'] },

  { slug: 'tech-ai', title: '灵枢 AI · 产品官网', industry: 'tech', type: '企业官网', layout: 'hero', accent: '#6366f1', status: 'planned', desc: 'AI 产品官网：能力演示、场景案例、API 文档。', tags: ['AI', '产品官网'] },
  { slug: 'tech-cloud', title: '云计算控制台', industry: 'tech', type: '后台管理', layout: 'app', accent: '#4f46e5', status: 'planned', desc: '云控制台：资源总览、实例列表、用量监控。', tags: ['控制台', '图表'] },
  { slug: 'tech-app', title: '效率工具 App 落地页', industry: 'tech', type: '落地页', layout: 'hero', accent: '#8b5cf6', status: 'planned', desc: 'App 推广落地页：功能亮点、用户评价、下载引导。', tags: ['落地页', 'App'] },

  { slug: 'automotive-4s', title: '星辰汽车 · 4S 店', industry: 'automotive', type: '企业官网', layout: 'hero', accent: '#1d4ed8', status: 'planned', desc: '4S 店官网：车型展厅、配置对比、试驾预约。', tags: ['车型展厅', '预约'] },
  { slug: 'automotive-used', title: '优车 · 二手车', industry: 'automotive', type: '电商商城', layout: 'list', accent: '#2563eb', status: 'planned', desc: '二手车平台：车源列表、检测报告、分期计算。', tags: ['列表', '计算器'] },
  { slug: 'automotive-care', title: '亮车 · 汽车美容', industry: 'automotive', type: '落地页', layout: 'hero', accent: '#0ea5e9', status: 'planned', desc: '汽车美容门店页：服务价目、施工对比、在线预约。', tags: ['门店页'] },

  { slug: 'beauty-salon', title: '花漾美容 · 连锁', industry: 'beauty', type: '企业官网', layout: 'hero', accent: '#db2777', status: 'planned', desc: '美容连锁官网：项目介绍、门店、会员卡。', tags: ['连锁门店'] },
  { slug: 'beauty-hair', title: '剪影 · 美发沙龙', industry: 'beauty', type: '预约服务', layout: 'split', accent: '#c026d3', status: 'planned', desc: '美发预约：发型师选择、时段预约、作品集。', tags: ['预约'] },
  { slug: 'beauty-clinic', title: '臻颜医美 · 机构', industry: 'beauty', type: '落地页', layout: 'hero', accent: '#a21caf', status: 'planned', desc: '医美机构页：项目分类、医师团队、术后对比。', tags: ['落地页'] },

  { slug: 'sports-gym', title: '力刻健身 · 连锁', industry: 'sports', type: '企业官网', layout: 'hero', accent: '#16a34a', status: 'planned', desc: '健身房官网：场馆实景、课程表、体验卡。', tags: ['场馆', '课程表'] },
  { slug: 'sports-yoga', title: '静界瑜伽 · 馆', industry: 'sports', type: '预约服务', layout: 'split', accent: '#059669', status: 'planned', desc: '瑜伽馆预约：课表、教练、会员卡。', tags: ['预约'] },
  { slug: 'sports-shop', title: '运动装备商城', industry: 'sports', type: '电商商城', layout: 'grid', accent: '#0d9488', status: 'planned', desc: '运动装备电商：品类、尺码、评测内容。', tags: ['电商'] },

  { slug: 'wedding-photo', title: '拾光婚纱摄影', industry: 'wedding', type: '企业官网', layout: 'hero', accent: '#e11d48', status: 'planned', desc: '婚纱摄影官网：客片画廊、套系价格、预约。', tags: ['画廊', '预约'] },
  { slug: 'wedding-plan', title: '一生一世 · 婚庆策划', industry: 'wedding', type: '落地页', layout: 'split', accent: '#be123c', status: 'planned', desc: '婚庆策划：案例、流程、预算表。', tags: ['落地页'] },
  { slug: 'wedding-kids', title: '童画 · 儿童摄影', industry: 'wedding', type: '电商商城', layout: 'grid', accent: '#f43f5e', status: 'planned', desc: '儿童摄影：套系商城、档期选择、样片。', tags: ['套系电商'] },

  { slug: 'media-agency', title: '麦禾广告 · 创意机构', industry: 'media', type: '企业官网', layout: 'grid', accent: '#9333ea', status: 'planned', desc: '广告公司官网：案例作品墙、服务能力、团队。', tags: ['案例墙'] },
  { slug: 'media-film', title: '光影影视 · 制作', industry: 'media', type: '企业官网', layout: 'hero', accent: '#7c3aed', status: 'planned', desc: '影视制作公司：作品播放器、设备、服务流程。', tags: ['视频展示'] },
  { slug: 'media-event', title: '盛会 · 活动策划', industry: 'media', type: '落地页', layout: 'split', accent: '#a855f7', status: 'planned', desc: '活动策划落地页：案例、报价、需求表单。', tags: ['落地页'] },

  { slug: 'legal-firm', title: '明诚律师事务所', industry: 'legal', type: '企业官网', layout: 'split', accent: '#0f766e', status: 'planned', desc: '律所官网：业务领域、律师团队、经典案例。', tags: ['专业机构'] },
  { slug: 'legal-ip', title: '知产通 · 商标专利', industry: 'legal', type: '电商商城', layout: 'list', accent: '#115e59', status: 'planned', desc: '知识产权服务：服务标价、流程、在线下单。', tags: ['服务电商'] },

  { slug: 'logistics-express', title: '速通快递 · 官网', industry: 'logistics', type: '企业官网', layout: 'hero', accent: '#f59e0b', status: 'planned', desc: '快递官网：运单查询、网点、时效价格表。', tags: ['查询', '价目表'] },
  { slug: 'logistics-track', title: '物流轨迹追踪', industry: 'logistics', type: '后台管理', layout: 'app', accent: '#d97706', status: 'planned', desc: '物流后台：订单看板、轨迹地图、异常预警。', tags: ['后台', '地图'] },

  { slug: 'agriculture-farm', title: '沃野农业 · 生态', industry: 'agriculture', type: '企业官网', layout: 'hero', accent: '#65a30d', status: 'planned', desc: '生态农业官网：基地实景、产品溯源、助农故事。', tags: ['溯源'] },
  { slug: 'agriculture-shop', title: '山货铺 · 农产品商城', industry: 'agriculture', type: '电商商城', layout: 'grid', accent: '#4d7c0f', status: 'planned', desc: '农产品电商：产地直供、拼团、时令推荐。', tags: ['电商', '拼团'] },

  { slug: 'energy-solar', title: '中光新能源 · 光伏', industry: 'energy', type: '企业官网', layout: 'split', accent: '#059669', status: 'planned', desc: '光伏企业官网：解决方案、装机案例、收益测算。', tags: ['新能源', '测算'] },
  { slug: 'energy-green', title: '绿源环保 · 工程', industry: 'energy', type: '企业官网', layout: 'hero', accent: '#047857', status: 'planned', desc: '环保工程公司：治理工艺、项目案例、资质。', tags: ['工程'] },

  { slug: 'maternity-shop', title: '贝乐母婴 · 商城', industry: 'maternity', type: '电商商城', layout: 'grid', accent: '#f472b6', status: 'planned', desc: '母婴商城：月龄选品、清单、囤货组合。', tags: ['电商', '月龄'] },
  { slug: 'maternity-edu', title: '童萌早教中心', industry: 'maternity', type: '企业官网', layout: 'hero', accent: '#ec4899', status: 'planned', desc: '早教中心官网：课程体系、环境、试听预约。', tags: ['机构', '预约'] },

  { slug: 'pet-hospital', title: '安康宠物医院', industry: 'pet', type: '企业官网', layout: 'split', accent: '#a16207', status: 'planned', desc: '宠物医院：诊疗项目、医师、疫苗套餐。', tags: ['医疗', '套餐'] },
  { slug: 'pet-shop', title: '毛孩子 · 宠物生活馆', industry: 'pet', type: '电商商城', layout: 'grid', accent: '#ca8a04', status: 'planned', desc: '宠物用品电商：洗护预约、寄养、粮品。', tags: ['电商', '预约'] },

  { slug: 'entertainment-game', title: '星轨 · 游戏官网', industry: 'entertainment', type: '企业官网', layout: 'hero', accent: '#8b5cf6', status: 'planned', desc: '游戏官网：世界观、角色、下载引导、CG 展示。', tags: ['游戏', '沉浸式'] },
  { slug: 'entertainment-bar', title: '夜色 · Live House', industry: 'entertainment', type: '企业官网', layout: 'hero', accent: '#6d28d9', status: 'planned', desc: '酒吧官网：演出排期、订座、酒单。', tags: ['夜店', '排期'] },

  { slug: 'government-portal', title: '阳光政务 · 门户', industry: 'government', type: '资讯门户', layout: 'list', accent: '#b91c1c', status: 'planned', desc: '政务门户：信息公开、办事指南、通知公告。', tags: ['政务', '无障碍'] },
  { slug: 'government-community', title: '和悦社区 · 服务', industry: 'government', type: '移动端', layout: 'app', accent: '#dc2626', status: 'planned', desc: '社区服务移动端：办事、活动、邻里、志愿。', tags: ['移动端'] },

  { slug: 'personal-resume', title: '个人简历 · 求职版', industry: 'personal', type: '个人主页', layout: 'profile', accent: '#0f172a', status: 'planned', desc: '求职简历单页：能力雷达、项目经历、作品链接。', tags: ['简历'] },
  { slug: 'personal-blog', title: '技术博客 · 写作版', industry: 'personal', type: '资讯门户', layout: 'list', accent: '#1e293b', status: 'planned', desc: '个人博客：文章列表、标签云、归档时间线。', tags: ['博客'] },
];

/* 便于导航页使用的派生数据 */
const PAGE_TYPES = [...new Set(SITES.map(s => s.type))];
const INDUSTRY_MAP = Object.fromEntries(INDUSTRIES.map(i => [i.id, i]));

if (typeof window !== 'undefined') {
  window.INDUSTRIES = INDUSTRIES;
  window.SITES = SITES;
  window.PAGE_TYPES = PAGE_TYPES;
  window.INDUSTRY_MAP = INDUSTRY_MAP;
}
