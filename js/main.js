document.addEventListener('DOMContentLoaded', () => {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 服务标签切换功能
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // 移除所有活动状态
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // 添加新的活动状态
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
            
            // 添加动画效果
            activeContent.style.opacity = '0';
            activeContent.style.transform = 'translateY(20px)';
            
            // 触发重排以应用动画
            void activeContent.offsetWidth;
            
            activeContent.style.opacity = '1';
            activeContent.style.transform = 'translateY(0)';
        }
    }

    // 为每个标签按钮添加点击事件
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // 处理联系表单提交
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formProps = Object.fromEntries(formData);
            
            try {
                // 模拟成功提交
                alert(translations[currentLanguage]['contact.success'] || '消���已发送！');
                contactForm.reset();
            } catch (error) {
                console.error('Error:', error);
                alert(translations[currentLanguage]['contact.error'] || '发送失败，请稍后重试。');
            }
        });
    }

    // 响应式导航菜单
    const nav = document.querySelector('nav');
    
    // 添加滚动效果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 添加页面加载动画
    document.body.classList.add('loaded');

    // AI演示功能
    function startDemo() {
        const demoChat = document.getElementById('demoChat');
        const messages = [
            { type: 'user', text: '你们的AI客服系统有哪些特点？' },
            { type: 'bot', text: '我们的AI客服系统具有以下特点：\n1. 支持24/7全天候服务\n2. 多语言实时翻译\n3. 智能意图识别\n4. 个性化回答定制' },
            { type: 'user', text: '可以处理多少并发用户？' },
            { type: 'bot', text: '我们的系统支持10000+并发用户访问，采用分布式架构，确保服务稳定性。同时支持弹性扩展，可根据业务需求动态调整资源���' }
        ];

        demoChat.innerHTML = ''; // 清空现有消息
        let index = 0;

        function showNextMessage() {
            if (index < messages.length) {
                const message = messages[index];
                const messageDiv = document.createElement('div');
                messageDiv.className = `chat-message ${message.type}`;
                messageDiv.innerHTML = `
                    <div class="message-avatar">
                        <i class="fas fa-${message.type === 'user' ? 'user' : 'robot'}"></i>
                    </div>
                    <div class="message-content">${message.text}</div>
                `;
                demoChat.appendChild(messageDiv);
                messageDiv.scrollIntoView({ behavior: 'smooth' });
                index++;
                setTimeout(showNextMessage, 2000);
            }
        }

        showNextMessage();
    }

    // 视觉AI演示功能
    function toggleVisionDemo() {
        const canvas = document.getElementById('visionDemo');
        const ctx = canvas.getContext('2d');
        const overlay = document.querySelector('.detection-overlay');
        
        // 模拟对象检测
        function detectObjects() {
            const objects = [
                { x: 50, y: 50, width: 100, height: 100, label: '产品A - 合格' },
                { x: 200, y: 150, width: 120, height: 80, label: '产品B - 待检' },
                { x: 350, y: 100, width: 90, height: 90, label: '产品C - 缺陷' }
            ];

            overlay.innerHTML = '';
            objects.forEach(obj => {
                const box = document.createElement('div');
                box.className = 'detection-box';
                box.style.left = `${obj.x}px`;
                box.style.top = `${obj.y}px`;
                box.style.width = `${obj.width}px`;
                box.style.height = `${obj.height}px`;
                
                const label = document.createElement('div');
                label.className = 'detection-label';
                label.textContent = obj.label;
                box.appendChild(label);
                
                overlay.appendChild(box);
            });
        }

        // 开始演示
        let isRunning = false;
        const button = event.target;
        
        if (!isRunning) {
            button.textContent = '停止检测';
            isRunning = true;
            detectObjects();
            // 模拟实时检测
            setInterval(() => {
                if (isRunning) {
                    detectObjects();
                }
            }, 2000);
        } else {
            button.textContent = '开始检测';
            isRunning = false;
            overlay.innerHTML = '';
        }
    }
}); 