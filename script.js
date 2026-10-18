 // 1. Menu Category Filtering
        function filterMenu(category, btn) {
            document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const items = document.querySelectorAll('.menu-item');
            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // 2. Coffee Customizer Modal Logic
        let currentItemBasePrice = 6.50;
        let customizerModal;

        function openCustomizerModal(title, basePrice) {
            currentItemBasePrice = basePrice;
            document.getElementById('modalItemTitle').textContent = title;
            document.getElementById('modalBasePrice').textContent = `$${basePrice.toFixed(2)}`;
            
            // Reset selectors
            document.getElementById('milkSelect').selectedIndex = 0;
            document.getElementById('shotSelect').selectedIndex = 0;
            updateCustomPrice();

            customizerModal = new bootstrap.Modal(document.getElementById('customizerModal'));
            customizerModal.show();
        }

        function updateCustomPrice() {
            const milkAdd = parseFloat(document.getElementById('milkSelect').value) || 0;
            const shotAdd = parseFloat(document.getElementById('shotSelect').value) || 0;
            const total = currentItemBasePrice + milkAdd + shotAdd;
            document.getElementById('calculatedPrice').textContent = `$${total.toFixed(2)}`;
        }

        function confirmOrder() {
            if (customizerModal) {
                customizerModal.hide();
            }
            alert("Order Added! Your custom beverage is queued for express pickup.");
        }

        // 3. Flavor Quiz Logic
        let quizAnswers = { step1: '', step2: '' };

        function selectQuizOpt(step, value, btn) {
            const parent = btn.parentElement;
            parent.querySelectorAll('.quiz-opt-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (step === 1) {
                quizAnswers.step1 = value;
                setTimeout(() => {
                    document.getElementById('step1').classList.add('d-none');
                    document.getElementById('step2').classList.remove('d-none');
                }, 250);
            } else if (step === 2) {
                quizAnswers.step2 = value;
                setTimeout(() => {
                    document.getElementById('step2').classList.add('d-none');
                    showQuizResult();
                }, 250);
            }
        }

        function showQuizResult() {
            const resTitle = document.getElementById('recommendTitle');
            const resDesc = document.getElementById('recommendDesc');
            const resNotes = document.getElementById('recommendNotes');
            const resMilk = document.getElementById('recommendMilk');

            if (quizAnswers.step1 === 'light') {
                resTitle.textContent = "Geisha Single Origin V60";
                resDesc.textContent = "Floral peach notes, crisp acidity, and delicate clarity.";
                resNotes.textContent = "Peach Blossom & Earl Grey";
                resMilk.textContent = "Served Black (Pour Over)";
            } else if (quizAnswers.step2 === 'iced') {
                resTitle.textContent = "Nitro Cascade Cold Brew";
                resDesc.textContent = "Silky nitrogen infused smooth cold brew with natural stout-like foam.";
                resNotes.textContent = "Dark Chocolate & Hazelnut";
                resMilk.textContent = "Optionally Oat Cold Foam";
            } else {
                resTitle.textContent = "Signature Velvet Latte";
                resDesc.textContent = "Double ristretto shot with house-made vanilla bean and steamed oat micro-foam.";
                resNotes.textContent = "Caramel & Vanilla";
                resMilk.textContent = "Steamed Oat Milk";
            }

            document.getElementById('stepResult').classList.remove('d-none');
        }

        function orderRecommended() {
            const title = document.getElementById('recommendTitle').textContent;
            openCustomizerModal(title, 6.50);
        }

        // 4. Store Location Selector
        const locationData = {
            flagship: {
                title: "Downtown Flagship & Roastery",
                address: "482 Grand Avenue, Suite 100 — (555) 234-8901"
            },
            arts: {
                title: "Arts District Espresso Lab",
                address: "1109 Canvas Street — (555) 987-3412"
            }
        };

        function switchLocation(key, card) {
            document.querySelectorAll('.location-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            document.getElementById('locTitle').textContent = locationData[key].title;
            document.getElementById('locAddress').textContent = locationData[key].address;
        }

        // 5. Newsletter Toast
        function handleNewsletter(e) {
            e.preventDefault();
            alert("Welcome to the Velvet Coffee Club! Check your inbox for your 10% off bean bag code.");
            e.target.reset();
        }