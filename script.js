document.addEventListener('DOMContentLoaded', function() {
    // Поиск
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            alert('Вы искали: ' + this.value);
        }
    });

    document.querySelectorAll('.details-btn2').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const banner = this.closest('.details-btn2');
            if (banner.classList.contains('details-btn2')) {
                alert('Переход к акции -20%');
            } 
        });
    });

    document.getElementById('aboutBtn').addEventListener('click', function() {
        window.location.href = 'about.html';
    });

    document.querySelectorAll('.details-btn3').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const banner = this.closest('.details-btn3');
            if (banner.classList.contains('details-btn3')) {
                alert('Переход к акции "Лампочка в подарок"');
            } 
        });
    });

    const t = document.getElementById("t");

    // Навигация
    const catalogBtn = document.getElementById("catalog-btn");
const catalogMenu = document.getElementById("catalog-menu");

catalogBtn.addEventListener("mouseenter", () => {
  catalogMenu.classList.remove("hidden");
});

catalogBtn.addEventListener("mouseleave", () => {
  catalogMenu.classList.add("hidden");
});

catalogMenu.addEventListener("mouseenter", () => {
  catalogMenu.classList.remove("hidden");
});

catalogMenu.addEventListener("mouseleave", () => {
  catalogMenu.classList.add("hidden");
});
    // Выбор города
    document.querySelectorAll('.city-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelector('.city-name').textContent = this.textContent;
            document.querySelector('.cities-dropdown').classList.remove('visible');
        });
    });

    document.querySelector('.city-selector').addEventListener('mouseenter', function() {
        this.querySelector('.cities-dropdown').classList.add('visible');
    });

    document.querySelector('.city-selector').addEventListener('mouseleave', function() {
        this.querySelector('.cities-dropdown').classList.remove('visible');
    });

    // Обработчики для футера
    document.querySelector('.callback-link').addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Открытие формы обратного звонка');
    });

    document.querySelector('.all-addresses').addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Показать все адреса');
    });

    document.querySelectorAll('.footer-column ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Переход по ссылке: ' + this.textContent);
        });
    });

    // Инициализация корзины
    let cart = {
        items: [],
        total: 0,
        count: 0
    };

    // Проверяем, есть ли сохраненная корзина в localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartIcon();
    }

    // Функция обновления иконки корзины
    function updateCartIcon() {
        const bagElement = document.querySelector('.bag');
        const blackElement = document.querySelector('.black');
        blackElement.textContent = cart.total.toLocaleString('ru-RU') + ' ₽';
        blackElement.style.display = 'flex';
        blackElement.style.alignItems = 'center';
        blackElement.style.justifyContent = 'flex-start';
        
        // Удаляем старый бейдж, если есть
        const oldBadge = bagElement.querySelector('.cart-count-badge');
        if (oldBadge) {
            oldBadge.remove();
        }
        
        // Создаем новый бейдж с количеством товаров
        if (cart.count > 0) {
    const countBadge = document.createElement('span');
    countBadge.className = 'cart-count-badge';
    countBadge.textContent = cart.count;

    // Стили для бейджа
    countBadge.style.position = 'absolute';
    countBadge.style.top = '6px';
    countBadge.style.right = '5px'; /* Позиционируем справа внутри .black */
    countBadge.style.color = '#000';
    countBadge.style.display = 'flex';
    countBadge.style.alignItems = 'center';
    countBadge.style.justifyContent = 'center';
    countBadge.style.fontSize = '12px';
    countBadge.style.fontWeight = 'bold';

    bagElement.appendChild(countBadge);

    // Обновляем текст в черном фоне корзины (сумма)
    blackElement.textContent = cart.total.toLocaleString('ru-RU') + ' ₽';
    blackElement.style.display = 'flex';
    blackElement.style.alignItems = 'right';
    blackElement.style.justifyContent = 'center'; /* Выравниваем по правому краю */
    blackElement.style.paddingRight = '30px'; /* Добавляем отступ справа для суммы */
    blackElement.style.color = '#fff';
    blackElement.style.fontSize = '14px';
    blackElement.style.fontWeight = 'bold';
} else {
    blackElement.textContent = '';
}
        
        // Сохраняем корзину
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Функция добавления товара в корзину
    function addToCart(productId, productName, price, originalPrice, imageUrl) {
        const existingItem = cart.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                id: productId,
                name: productName,
                price: price,
                originalPrice: originalPrice,
                quantity: 1,
                image: imageUrl
            });
        }
        
        recalculateCart();
        updateCartIcon();
        
        // Анимация добавления
        const bagIcon = document.querySelector('.bag');
        bagIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            bagIcon.style.transform = 'scale(1)';
        }, 200);
        
        // Показываем уведомление
        showNotification('Товар добавлен в корзину');
    }

    // Функция показа уведомления
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#FFDE00';
        notification.style.color = '#000';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '20px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 2000);
    }

    // Пересчет суммы и количества
    function recalculateCart() {
        cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cart.count = cart.items.reduce((count, item) => count + item.quantity, 0);
    }

   // Обработчики для всех кнопок "В корзину"
document.querySelectorAll('[class^="o"] > div').forEach(button => {
    if (button.textContent.trim() === 'В корзину') {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Находим родительский контейнер товара (div с классом o1, o2 и т.д.)
            const productContainer = this.closest('[class^="o"]');
            const productNum = productContainer.className.match(/o(\d+)/)[1];
            
            // Собираем данные о товаре (используем более надежные селекторы)
            const productData = {
                id: `product-${productNum}`,
                name: document.querySelector(`.k${productNum}`)?.textContent.trim() || 'Без названия',
                price: parsePrice(document.querySelector(`.k${productNum}t`)?.textContent),
                originalPrice: parsePrice(document.querySelector(`.k${productNum}ta`)?.textContent),
                image: '' // Оставим пустым, так как изображения не найдены
            };
            
            // Если цена не найдена, используем оригинальную цену
            if (!productData.price && productData.originalPrice) {
                productData.price = productData.originalPrice;
            }
            
            console.log('Добавляем товар:', productData);
            addToCart(
                productData.id,
                productData.name,
                productData.price,
                productData.originalPrice,
                productData.image
            );
        });
    }
});

// Вспомогательная функция для парсинга цены
function parsePrice(priceText) {
    if (!priceText) return 0;
    const num = priceText.replace(/\s+/g, '').replace(/[^\d]/g, '');
    return parseFloat(num) || 0;
}
    // Обработчик клика по иконке корзины
    document.querySelector('.bag').addEventListener('click', function(e) {
        e.preventDefault();
        if (cart.count > 0) {
            // Создаем модальное окно корзины
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
            modal.style.zIndex = '1000';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            
            // Содержимое модального окна
            const modalContent = document.createElement('div');
            modalContent.style.backgroundColor = '#fff';
            modalContent.style.padding = '20px';
            modalContent.style.borderRadius = '10px';
            modalContent.style.width = '60%';
            modalContent.style.maxWidth = '800px';
            modalContent.style.maxHeight = '80vh';
            modalContent.style.overflowY = 'auto';
            
            // Заголовок
            const title = document.createElement('h2');
            title.textContent = 'Ваша корзина';
            title.style.marginBottom = '20px';
            title.style.textAlign = 'center';
            modalContent.appendChild(title);
            
            // Список товаров
            const itemsList = document.createElement('div');
            cart.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.style.display = 'flex';
                itemElement.style.marginBottom = '15px';
                itemElement.style.paddingBottom = '15px';
                itemElement.style.borderBottom = '1px solid #eee';
                
                // Изображение товара
                if (item.image) {
                    const img = document.createElement('img');
                    img.src = item.image;
                    img.style.width = '80px';
                    img.style.height = '80px';
                    img.style.objectFit = 'contain';
                    img.style.marginRight = '15px';
                    itemElement.appendChild(img);
                }
                
                // Информация о товаре
                const info = document.createElement('div');
                info.style.flex = '1';
                
                const name = document.createElement('div');
                name.textContent = item.name;
                name.style.fontWeight = 'bold';
                name.style.marginBottom = '5px';
                info.appendChild(name);
                
                const price = document.createElement('div');
                price.textContent = `${item.price.toLocaleString('ru-RU')} ₽ x ${item.quantity} = ${(item.price * item.quantity).toLocaleString('ru-RU')} ₽`;
                info.appendChild(price);
                
                // Управление количеством
                const controls = document.createElement('div');
                controls.style.display = 'flex';
                controls.style.alignItems = 'center';
                controls.style.marginTop = '10px';
                
                const minusBtn = document.createElement('button');
                minusBtn.textContent = '-';
                minusBtn.style.width = '25px';
                minusBtn.style.height = '25px';
                minusBtn.style.border = '1px solid #ddd';
                minusBtn.style.borderRadius = '4px';
                minusBtn.style.marginRight = '5px';
                minusBtn.style.cursor = 'pointer';
                minusBtn.addEventListener('click', () => {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        cart.items = cart.items.filter(i => i.id !== item.id);
                    }
                    recalculateCart();
                    updateCartIcon();
                    modal.remove();
                    showNotification('Корзина обновлена');
                    setTimeout(() => {
                        document.querySelector('.bag').click();
                    }, 500);
                });
                controls.appendChild(minusBtn);
                
                const quantity = document.createElement('span');
                quantity.textContent = item.quantity;
                quantity.style.margin = '0 5px';
                controls.appendChild(quantity);
                
                const plusBtn = document.createElement('button');
                plusBtn.textContent = '+';
                plusBtn.style.width = '25px';
                plusBtn.style.height = '25px';
                plusBtn.style.border = '1px solid #ddd';
                plusBtn.style.borderRadius = '4px';
                plusBtn.style.marginLeft = '5px';
                plusBtn.style.cursor = 'pointer';
                plusBtn.addEventListener('click', () => {
                    item.quantity++;
                    recalculateCart();
                    updateCartIcon();
                    modal.remove();
                    showNotification('Корзина обновлена');
                    setTimeout(() => {
                        document.querySelector('.bag').click();
                    }, 500);
                });
                controls.appendChild(plusBtn);
                
                info.appendChild(controls);
                itemElement.appendChild(info);
                itemsList.appendChild(itemElement);
            });
            modalContent.appendChild(itemsList);
            
            // Итоговая сумма
            const total = document.createElement('div');
            total.style.marginTop = '20px';
            total.style.fontWeight = 'bold';
            total.style.fontSize = '18px';
            total.style.textAlign = 'right';
            total.textContent = `Итого: ${cart.total.toLocaleString('ru-RU')} ₽`;
            modalContent.appendChild(total);
            
            // Кнопки
            const buttons = document.createElement('div');
            buttons.style.display = 'flex';
            buttons.style.justifyContent = 'space-between';
            buttons.style.marginTop = '20px';
            
            const continueBtn = document.createElement('button');
            continueBtn.textContent = 'Продолжить покупки';
            continueBtn.style.padding = '10px 15px';
            continueBtn.style.backgroundColor = '#f0f0f0';
            continueBtn.style.border = 'none';
            continueBtn.style.borderRadius = '5px';
            continueBtn.style.cursor = 'pointer';
            continueBtn.addEventListener('click', () => {
                modal.remove();
            });
            buttons.appendChild(continueBtn);
            
            const checkoutBtn = document.createElement('button');
            checkoutBtn.textContent = 'Оформить заказ';
            checkoutBtn.style.padding = '10px 15px';
            checkoutBtn.style.backgroundColor = '#FFDE00';
            checkoutBtn.style.border = 'none';
            checkoutBtn.style.borderRadius = '5px';
            checkoutBtn.style.cursor = 'pointer';
            checkoutBtn.addEventListener('click', () => {
                alert('Переход к оформлению заказа');
                modal.remove();
            });
            buttons.appendChild(checkoutBtn);
            
            modalContent.appendChild(buttons);
            modal.appendChild(modalContent);
            
            // Кнопка закрытия
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '20px';
            closeBtn.style.backgroundColor = 'transparent';
            closeBtn.style.border = 'none';
            closeBtn.style.color = '#fff';
            closeBtn.style.fontSize = '30px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });
            modal.appendChild(closeBtn);
            
            document.body.appendChild(modal);
        } else {
            alert('Корзина пуста');
        }
    });
});



