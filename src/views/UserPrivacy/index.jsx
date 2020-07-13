/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { observer } from 'mobx-react-lite'
import style from './index.scss'

const UserPrivacy = () => {
  return (
    <div className={style.pageContent}>
      <div className={style.logo}>
        <img width={66} height={66} src="/src/assets/img/logo.png" alt="" />
      </div>
      <div className={style.title}>
        <div>超G知识库用户隐私保护政策</div>
      </div>
      <div className={style.agreement}>
        <p>
          为切实保护超G知识库用户个人信息，优化用户体验，超G知识库网络平台（以下或称“我们”“超G知识库平台”或“平台”，指Gworld(平潭)互联网科技有限公司）根据现行法规及政策，制定《超G知识库用户隐私保护政策》（“本政策”）。
          本政策将详细说明超G知识库网络平台在获取、管理及保护用户个人信息方面的政策及措施。本政策适用于超G知识库平台向你提供的所有服务，无论你是通过计算机设备、移动终端还是其他设备获得的超G知识库平台服务。本政策将详细说明平台在获取、管理及保护用户个人信息方面的政策及措施。本政策适用于平台向你提供的所有服务，无论你是通过计算机设备、移动终端还是其他设备获得的平台服务。
        </p>
        <p>
          如你对于本政策或相关事宜有任何问题，你可随时通过访问超G知识库平台在线客服系统、官方客服电话等多种方式与我们联系。
        </p>
        <p className={style.subTitle}>本政策将帮助你了解以下内容：</p>
        <p className={style.subTitle}>1、个人信息的收集</p>
        <p className={style.subTitle}>2、对 Cookie 和web beacon的使用</p>
        <p className={style.subTitle}>3、个人信息的使用</p>
        <p className={style.subTitle}>4、个人信息的保护和安全措施</p>
        <p className={style.subTitle}>5、个人信息的存储</p>
        <p className={style.subTitle}>6、个人信息的共享、转让、公开披露</p>
        <p className={style.subTitle}>7、个人信息的管理</p>
        <p className={style.subTitle}>8、对未成年人个人信息的特别保护</p>
        <p className={style.subTitle}>9、个人信息保护政策的修改</p>
        <p className={style.subTitle}>10、争议解决</p>
        <p>
          本政策是你使用超G知识库服务（简称“该服务”）及各项功能的基础性法律文件，我们希望你在使用该服务前仔细阅读并明确你已经充分理解、接受本政策的内容，希望你可以根据自己的理解做出合适的选择。我们努力通过通俗的语言表述本政策中涉及的相关术语，并提供进一步说明的链接，以便你更好地理解。在我们更新本政策后（我们会及时提示你更新的情况）你继续使用我们的产品与/或服务，即意味着你同意本政策(含更新版本)内容，并且同意我们按照本政策收集、使用、保存和共享你的相关信息。
        </p>
        <p>
          本政策涉及的个人信息包括：
          <span className={style.subTitle}>
            个人基本信息（包括个人姓名、生日、性别、住址、个人电话号码、电子邮箱）；个人身份信息（包括身份证、军官证、护照、驾驶证、相关身份证明等）；个人位置信息；网络身份标识信息（包括系统账号、IP地址、邮箱地址及与前述有关的密码、密保）；通讯录；个人上网记录（包括搜索记录、软件使用记录、点击记录）；个人常用设备信息（包括硬件型号、设备MAC地址、操作系统类型、软件列表、唯一设备识别码（如IMEI/android
            ID/IDFA/OPENUDID/GUID、SIM卡IMSI信息等在内的描述个人常用设备基本情况的信息）
          </span>
        </p>
        <p>
          个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息，本政策中涉及的个人敏感信息包括：
          <span className={style.subTitle}>
            个人身份信息（包括身份证、军官证、护照、驾驶证、户口本，相关身份证明等）；网络身份识别信息（包括账户名、账户昵称、邮箱地址及与前述有关的密码与密码保护问题和答案）；其他信息（包括通讯录、个人电话号码、手机号码、行程信息、网页浏览记录、精准定位信息、银行账户）。对于个人敏感信息，我们将在本政策中进行显著标识，请您注意仔细阅读。
          </span>
        </p>
        <p className={style.subTitle}>一、个人信息的收集</p>
        <p>
          1.1
          你已知悉且同意，在你注册超G知识库账号或使用超G知识库平台提供的服务时，超G知识库将记录你提供的相关个人信息，如：密码、手机号码等，上述个人信息是你获得超G知识库平台提供服务的基础。同时，基于优化用户体验之目的，超G知识库平台会获取与提升该服务有关的其他信息，例如当你访问超G知识库时，我们可能会收集我们各类服务的受欢迎程度、浏览器软件信息等以便优化我们的服务。
        </p>
        <p>
          在你使用超G知识库前，我们会引导你阅读本政策，并在你接受本政策的基础上，获得你的相关个人信息。如果你不同意提供个人信息，你将无法使用超G知识库的全部或部分功能和服务，或无法获得更个性化的功能，或无法参加某些活动，或无法收到我们的通知等。
        </p>
        <p className={style.subTitle}>1.2 超G知识库平台仅会在出现下列情况时收集你的个人信息：</p>
        <p>
          1.2.1 在你注册超G知识库账号时，我们会收集你的
          <span className={style.subTitle}>
            账户昵称、性别、密码、密码保护选项、电子邮箱、手机号码、出生年月/年龄信息。
          </span>{' '}
          若你以其他方式关联登陆超G知识库平台，我们会向关联第三方请求你的个人信息，对于我们要求但第三方无法提供的个人信息，我们仍可以要求你提供。收集这些信息是为了帮您创建超G知识库账号，如果你拒绝提供这些信息，将影响你注册使用超G知识库。在您注册使用超G知识库时，我们会对你进行实名验证，如果你拒绝提供有关信息，平台将无法向你提供服务。
        </p>
        <p>
          1.2.2
          在你发送超G知识库平台、使用超G知识库平台提供的位置定位服务时，我们会收集你的位置信息、设备信息。收集这些信息是为了向你提供签到信息分享服务，或向你提供更精准和个性化的服务及保护你的账号安全。超G知识库平台保证在你的设备使用定位服务时不会收集其他无关信息。
        </p>
        <p>
          1.2.3
          在你使用超G知识库平台提供的搜索服务时，我们会收集你的查询关键字信息、搜索历史记录、设备信息，为了提供高效的搜索服务，这些信息有部分会暂时存储在你的本地存储设备之中。在此，你需要注意的是，你的关键词信息无法单独识别你的个人身份，其不属于你的个人信息，因此我们有权以其他的目的对其进行使用；只有当你的搜索关键词信息与你的其他信息互有联系并可以识别你的个人身份时，则在结合使用期间，我们会将你的搜索关键词信息作为你的个人信息，与你的搜索历史记录一同按照本政策进行处理与保护。
        </p>
        <p>
          1.2.4
          姓名、身份证号、职业、有关身份证明信息，收集这些信息是为了完成你的身份认证。超G知识库平台对你的这些隐私信息会加以最大程度的保护，如果你不提供这些信息，我们将无法提供相关服务。
        </p>
        <p>
          1.2.5
          当你参加超G知识库平台的有关营销活动时，我们会收集你的姓名、学校名称、通讯地址、联系方式、银行账号等信息。这些信息是你收到转账或礼品的基础，如果你拒绝提供这些信息，我们将无法向你转账或发放礼品。
        </p>
        <p>
          1.2.6
          如果你希望获得你所在城市的有关资讯，超G知识库平台会收集你设备的具体位置信息。超G知识库平台所收集的信息中不会涉及你设备的其他信息。
          当你在超G知识库平台中使用第三方提供的服务时，你需要允许第三方收集你的订单信息、支付信息等，如果你拒绝第三方在提供服务时收集此类信息，将可能会导致你无法在超G知识库平台中使用第三方服务。
        </p>
        <p>
          1.2.7
          基于对你信息的有效保护，我们会对收集到的你的信息进行去标识化处理，以保护你的信息安全。在此希望你了解并接受，在对收集到的你的信息进行去标识化处理、不会透露你个人信息的前提下，超G知识库平台有权对经过去标识化处理的你的信息进行分析并予以商业化的利用。
        </p>
        <p>
          1.2.8
          当你通过超G知识库平台登录第三方应用时，第三方可能会通过超G知识库平台获得你的个人昵称、头像等信息。如果你拒绝向第三方提供此类信息，你可以在超G知识库平台相关设置中关闭，关闭路径：超G知识库平台PC端-我-管理中心-我的应用-删除第三方应用。
        </p>
        <p>
          1.2.9
          当涉及国家安全与利益、社会公共利益、与犯罪侦查有关的相关活动，或者涉及你或他人生命财产安全但在特殊情况下无法获得你的及时授权，以及能够从其他合法公开的渠道获取或法律法规规定的其他情形下，超G知识库平台可能在不经过你的同意或授权的前提下，收集你的个人信息。
        </p>
        <p>
          1.2.10
          在某些特殊情况下，超G知识库平台会要求你提供相关证明等纸质版信息。如你按要求提供该类纸质版信息的，超G知识库平台会在收到你的纸质版信息的30天内，妥善处理你的信息并及时告知你。
        </p>
        <p>
          1.2.11
          超G知识库平台如在上述场景之外获得你的个人信息，将重新征得你的明示同意，并在获得你明示同意前向你充分说明应用场景与获取你相关信息的内容与范围。
        </p>
        <p className={style.subTitle}>二、对Cookie及web beacon的使用</p>
        <p className={style.subTitle}>
          Cookie可以帮助网站辨认注册用户，计算用户数量，通常被各网站用来判定完成注册的用户是否已经实现登录。超G知识库平台承诺，对cookie信息的研究仅用于提升服务/产品质量及优化用户体验之目的。同时，如你不希望个人信息保留在cookie中，你可以对浏览器进行配置：选择"拒绝cookie"或"当网站发送cookie时通知你"，你应当知道，鉴于超G知识库平台的服务是通过支持cookie来实现的，完成关闭cookie的操作后，可能影响到你访问超G知识库平台或不能充分取得超G知识库平台的服务。你不禁用cookie时，可能会得到提示，是否在下一次进入此网站时保留用户信息以便简化登录手续（如一键登录）。
        </p>
        <p className={style.subTitle}>超G知识库平台使用web beacon的方法和目的与cookie是相同的。</p>
        <p className={style.subTitle}>2.1 个人信息的使用</p>
        <p>为了向你提供更好的服务或产品，超G知识库平台会在下述情形使用你的个人信息：</p>
        <p className={style.subTitle}>1 根据相关法律法规的要求；</p>
        <p className={style.subTitle}>2 根据你的授权；</p>
        <p className={style.subTitle}>3 根据超G知识库平台相关服务条款、应用许可使用协议的约定。</p>
        <p>
          2.2 此外，
          <span className={style.subTitle}>
            你已知悉并同意：在现行法律法规允许的范围内，超G知识库平台可能会将你非敏感的个人信息用于市场营销，
          </span>
          使用方式包括但不限于：超G知识库平台会使用你所提供信息在超G知识库平台平台中向你展示或提供广告和促销资料，向你通告或推荐超G知识库平台的服务或产品信息，以及其他此类根据你使用超G知识库平台服务或产品的情况所认为你可能会感兴趣的信息。其中也包括你在采取授权等某动作时选择分享的信息，例如当你新增好友、在动态中新增地标、使用超G知识库平台的联络人汇入工具等。
        </p>
        <p className={style.subTitle}>三、个人信息的保护和安全措施</p>
        <p>
          3.1
          超G知识库平台将尽一切合理努力保护我们获得的用户个人信息，并由专门的数据安全部门对个人信息进行保护。为防止用户个人信息在意外的、未经授权的情况下被非法访问、复制、修改、传送、遗失、破坏、处理或使用，超G知识库平台已经并将继续采取以下措施保护你的个人信息：
        </p>
        <p>
          3.1.1
          我们的网络服务采取了传输层安全协议等加密技术，通过https等方式提供浏览服务，确保用户数据在传输过程中的安全
        </p>
        <p>3.1.2 通过采取加密技术对用户个人信息进行加密保存，并通过隔离技术进行隔离。</p>
        <p>
          3.1.3
          在个人信息使用时，例如个人信息展示、个人信息关联计算时，我们会采用包括内容替换、加密脱敏等多种数据脱敏技术增强个人信息在使用中的安全性。
        </p>
        <p>
          3.1.4
          设立严格的数据使用和访问制度，采用严格的数据访问权限控制和多重身份认证技术保护个人信息，避免数据被违规使用。
        </p>
        <p>3.1.5 采取专门的数据和技术安全审计，设立日志审计和行为审计多项措施。</p>
        <p className={style.subTitle}>3.2 保护个人信息采取的其他安全措施</p>
        <p>3.2.1 通过建立数据分类分级制度、数据安全管理规范、数据安全开发规范来管理规范个人信息的存储和使用。</p>
        <p>3.2.2 建立数据安全专项部门，负责安全应急响应组织，来推进和保障个人信息安全</p>
        <p>3.2.3 加强安全意识。我们还会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。</p>
        <p className={style.subTitle}>3.3 个人信息安全事件的通知</p>
        <p>
          3.3.1
          如发生个人信息有关的安全事件，超G知识库平台将第一时间向相应主管机关报备，并及时进行问题排查，开展应急措施。
        </p>
        <p>
          3.3.2
          向全量用户发送通知提醒更改密码，或通过电话、短信等各种方式触达用户知晓，并在超G知识库平台公共运营平台运营宣传，制止数据泄露。
        </p>
        <p>
          3.3.3
          尽管已经采取了上述合理有效措施，并已经遵守了相关法律规定要求的标准，但超G知识库平台仍然无法保证你的个人信息通过不安全途径进行交流时的安全性。因此，用户应采取积极措施保证个人信息的安全，如：定期修改账号密码，不将自己的账号密码等个人信息透露给他人。
        </p>
        <p>
          3.3.4
          你知悉：超G知识库平台提供的个人信息保护措施仅适用于超G知识库平台，一旦你离开超G知识库平台，浏览或使用其他网站、服务及内容资源，超G知识库平台即没有能力及义务保护你在超G知识库平台以外的网站提交的任何个人信息，无论你登录或浏览上述网站是否基于超G知识库平台的链接或引导。
        </p>
        <p>
          3.3.5
          网络环境中始终存在各种信息泄漏的风险，当出现意外事件、不可抗力等情形导致你的信息出现泄漏时，超G知识库平台将极力控制局面，及时告知你事件起因、超G知识库平台采取的安全措施、你可以主动采取的安全措施等相关情况。
        </p>
        <p className={style.subTitle}>四、个人信息的存储</p>
        <p>
          4.1
          超G知识库平台会采取合适的安全措施和技术手段存储及保护你的个人信息，以防止丢失、被误用、受到未授权访问或泄漏、被篡改或毁坏。你的个人信息存放在有密码控制的位于中国境内的服务器中，访问均是受到限制的。当你需要跨境信息传输服务时，超G知识库平台会默认你继续使用中国境内的服务器。
        </p>

        <p className={style.subTitle}>
          4.2
          超G知识库平台会依照个人信息的不同等级存储不同期限，存储期限严格按照法律及相关法规规定，最低期限不少于6个月。我们将会按照《网络安全法》、《电子商务法》规定的期限保存您的个人信息。超出法定保存期限后，我们会将您的个人信息删除或做匿名化处理。
        </p>
        <p>
          4.3
          如果您终止使用“超G知识库平台”软件及服务，我们将停止对您的信息的收集和使用，法律法规另有规定的除外。如果我们停止运营，我们将停止收集和使用您的个人信息。我们将在用户注销的6个月后随之删除相应的信息或匿名化处理。
        </p>
        <p>4.4. 我们仅允许有必要知晓这些信息的超G知识库平台员工等第三方访问个人信息，并要求他们履行相应的保密义务。</p>
        <p>4.5 超G知识库平台如涉及向境外传输个人信息，将会向用户明确告知并征得同意。</p>
        <p className={style.subTitle}>五、个人信息的共享、转让、公开披露</p>
        <p>
          5.1
          我们会以高度的勤勉义务对待您的信息。除非经过您本人事先授权同意，我们不会向第三方共享、转让可识别的个人信息。我们可能共享、转让去标识化处理后的个人信息，且保证共享第三方无法重新识别此类信息的自然人主体。特定前提下，我们可能将您的个人信息与第三方共享，但我们只会共享必要的个人信息，且第三方受本政策中所声明目的的约束。我们将要求第三方对您的个人信息采取保护措施并且严格遵守相关法律法规与监管要求。第三方如要改变个人信息的处理目的，将再次征求您的授权同意。
        </p>
        <p className={style.subTitle}>5.2 您同意我们与如下几类第三方授权合作伙伴共享信息：</p>
        <p>
          5.2.1
          为实现特定功能，我们可能会与业务合作伙伴共享您的信息。我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。我们共享这些信息仅为实现本政策中声明的目的。例如，当第三方软件、设备系统与“超G知识库平台”产品或服务结合为您提供基于位置的服务时，“超G知识库平台”可能会基于您对系统定位的授权及设定，收集您的位置信息及设备信息（例如硬件型号、操作系统版本号、国际移动设备身份识别码（IMEI）、网络设备硬件地址（MAC）），并经过去标识化处理后提供给前述合作伙伴，特殊情境下还会包含您另行填写的联系信息。如您拒绝此类信息的收集及使用，您需要在设备系统中进行设置或关闭提供服务的软件，“超G知识库平台”中无法自动或手动设置关闭相关服务。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途。
        </p>
        <p>
          5.2.2
          为实现程序化广告推送，我们可能会与广告合作伙伴共享去标识化或匿名化处理后的信息。未经您授权，我们不会将您的个人身份信息（指可以识别您身份的信息，例如姓名或电子邮箱，通过这些信息可以联系到您或识别您的身份）与提供广告的服务商共享。但我们可能会将您的匿名化的用户画像与广告服务商共享，以帮助其在不识别您个人的前提下提升广告有效触达率。例如，只有在广告主同意遵守我们的广告发布规范后，我们才可能会告诉广告主他们广告的效果如何，或者有多少人看了他们广告或在看到广告后安装了应用，或者向这些合作伙伴提供不能识别个人身份的统计信息（例如“女性，25-29岁，位于北京”），帮助他们了解其受众或顾客。您可以拒绝我们向您推送程序化广告，但不影响您使用其他服务。
        </p>
        <p>
          5.2.3
          为帮助您参加营销推广活动，我们可能会与第三方共享您的信息。当您选择参加我们举办的有关营销活动时，根据活动需要，您可能会向我们提供姓名、通信地址、联系方式、银行账号。经过您的明示同意，我们会将上述信息与第三方共享以便我们能委托第三方及时向您提供服务。
        </p>
        <p>
          5.3
          对我们与之共享个人信息的公司、组织和个人，我们会对其数据安全环境进行调查，与其签署严格的保密协定，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。
        </p>
        <p>
          5.4
          随着我们业务的持续发展，我们以及我们的关联公司有可能进行合并、收购、资产转让或类似的交易，您的个人信息有可能作为此类交易的一部分而被转移，我们将在转移前通知您，我们将按照法律法规及不低于本隐私政策所要求的标准继续保护或要求新的控制者继续保护您的个人信息。
        </p>
        <p className={style.subTitle}>
          5.5
          未经您本人允许，我们不会向除公司及其关联方外的任何公司、组织和个人，共享、转让、公开披露您的个人信息，下列情形除外：
        </p>
        <p className={style.subTitle}>5.5.1 事先获得您的明确授权同意；</p>
        <p className={style.subTitle}>5.5.2 您自行向第三方共享、转让、公开的</p>
        <p className={style.subTitle}>5.5.3 与国家安全、国防安全、公共安全、公共卫生、公共利益直接相关的；</p>
        <p className={style.subTitle}>
          5.5.4
          根据适用的法律法规、法律程序的要求、强制性的行政司法要求进行披露或提供，或对外提供的个人信息是与犯罪侦查、起诉、审判和判决执行等直接相关的。在前述情况下，我们会依据被要求提供或披露的个人信息类型和方式提供/披露您的个人信息。在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求请求方必须出具相应的法律文件，如传票或调查函。我们将对所有的请求都进行审慎的审查，以确保其具备合法依据，且请求的数据仅限于行政、司法部门因特定调查目的有合法权利获取的数据；
        </p>
        <p className={style.subTitle}>
          5.5.5
          在法律法规允许的范围内，为维护“超G知识库平台”其他用户、公司及其关联公司、控制公司的生命、财产等合法权益或维护产品或服务的安全稳定运行所必需的，例如查找、预防、处理欺诈等违法活动和减少信用风险等；不过这并不包括违反本政策中所做的承诺而为获利目的对外公开或提供个人信息；
        </p>
        <p className={style.subTitle}>5.5.6 公司为维护合法权益而向用户提起诉讼或仲裁；</p>
        <p className={style.subTitle}>
          5.5.7
          在涉及合并、分立、收购、资产转让或类似的交易时，如涉及到个人信息转让，公司会要求新的持有您的个人信息的公司、组织继续受本隐私政策的约束，否则，公司有权要求该公司、组织重新取得您的授权同意；
        </p>
        <p className={style.subTitle}>
          5.5.8 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；
        </p>
        <p className={style.subTitle}>
          5.5.9
          为学术研究目的，或为学术研究机构，出于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；
        </p>
        <p className={style.subTitle}>5.5.10 法律法规规定的其他情形。</p>
        <p className={style.subTitle}>
          5.6
          您应当理解，您在使用超G知识库平台服务过程中，可以向特定的人发送照片、身份信息、位置信息等个人信息，也可以基于超G知识库平台的服务向不特定人共享自己的照片、位置信息、身份信息等个人信息。您因为这些主动共享、披露行为导致您个人信息被他人知晓的，超G知识库平台不承担相关责任。
        </p>
        <p className={style.subTitle}>个人信息的管理</p>
        <p>
          5.6.1
          当你完成超G知识库平台的账号注册并进行合理和必要的身份验证后，你可以查阅、修改、删除你提交给超G知识库平台的个人信息。一般情况下，你可随时浏览、修改、删除自己提交的信息。
        </p>
        <p>
          5.6.2
          超G知识库平台始终将对你个人信息的保护放在首位，同时，超G知识库平台重视你对个人信息的关注。对于你的个人信息，你可以通过手机客户端等途径进行在线查询、修改、删除。
        </p>
        <p>
          5.6.3
          你有权自主更新或更正你的个人信息，或授权超G知识库平台客服进行信息更新、更正。在你进行信息更新更正之前，我们会首先验证你的身份，核实身份后你才能进行信息的更正与更新。
        </p>
        <p>
          5.6.4
          如果你对本政策或其中有关你个人信息的收集、使用、存储、保护等功能存在意见或建议时，你可以通过超G知识库平台功能页面、或超G知识库平台客户服务渠道反馈意见或投诉，超G知识库平台会在收到你意见及建议的第一时间将反馈信息回复给你。
        </p>
        <p>
          5.6.5
          你可以通过关闭超G知识库平台部分功能的方式阻止超G知识库平台获得你的个人信息，关闭部分功能之后，我们将无法向你提供相应的服务。
        </p>
        <p>
          5.5.6
          你可以自主要求注销超G知识库平台账号以保障超G知识库平台不再收集你的个人信息。你可以通过手机客户端注销账号，在你注销你的账号之前，超G知识库平台将验证你的个人身份、安全状态、常用设备等信息。
          <span className={style.subTitle}>
            你注销账号的行为是不可逆的行为，一旦你注销你的账号，超G知识库平台将即刻删除有关你账户的一切信息，并保证这些信息不会泄露，同时，你也无法通过已注销的账户获得超G知识库平台的服务。
          </span>
        </p>
        <p className={style.subTitle}>
          5.5.7
          如果我们终止服务或运营，我们会至少提前三十日向你通知，并在终止服务或运营后对你的个人信息进行删除或匿名化处理。
        </p>
        <p className={style.subTitle}>六、对未成年人个人信息的特别保护</p>
        <p className={style.subTitle}>
          若您是未满18周岁的未成年人，在使用“超G知识库平台”软件及相关服务前，应在您的父母或其他监护人监护、指导下共同阅读并决定是否同意本个人信息保护政策，公司根据国家相关法律法规的规定保护未成年人的个人信息。
        </p>
        <p className={style.subTitle}>七、个人信息保护政策的修改</p>
        <p>
          7.1
          为给你提供更好的服务以及随着我们业务的发展，本政策也会随之更新。但未经你明确同意，我们不会削减你依据当前生效个人信息保护政策所应享有的权利。
        </p>
        <p>
          我们会在网站、移动端上发出更新版本并在生效前通过网站公告或其他适当方式提醒你相关内容的更新，以便你及时了解最新的个人信息保护政策。
        </p>
        <p>
          7.2
          对于重大变更，我们还会提供更为显著的通知（我们会通过包括但不限于邮件、短信、私信或在浏览页面做特别提示等方式，说明个人信息保护政策的具体变更内容）。
        </p>
        <p>7.3 本政策所指的重大变更包括但不限于：</p>
        <p>7.3.1 我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</p>
        <p>7.3.2 我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；</p>
        <p>7.3.3 个人信息共享、转让或公开披露的主要对象发生变化；</p>
        <p>7.3.4 你参与个人信息处理方面的权利及其行使方式发生重大变化；</p>
        <p>7.3.5 我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；</p>
        <p>7.3.6 个人信息安全影响评估报告表明存在高风险时。</p>
        <p className={style.subTitle}>八、争议解决</p>
        <p>
          8.1
          当你因为本政策的实施与超G知识库平台产生任何纠纷时，双方应首先协商友好解决；若不能协商解决，双方有权依照注册协议向有管辖权的法院提起诉讼。如果你对本个人信息保护政策有任何疑问，请你通过以下方式与我们联系：
          <span className={style.subTitle}>客服热线：400-900-8789</span>
          或站内客服通道联系我们，我们核查并验证您的用户身份后会及时反馈您的投诉与举报，我们会及时解决你的问题。{' '}
        </p>
        <p>8.2 如对本隐私政策内容有任何疑问、意见或建议，您可通过登录“超G热播”客户端内的“联系客服”页面与我们联系。</p>
      </div>
    </div>
  )
}

export default observer(UserPrivacy)