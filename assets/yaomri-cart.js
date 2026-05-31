(function () {
  var cartRoot = document.querySelector(".cnvrt-cart");
  if (!cartRoot) return;

  var moneyFormat = cartRoot.dataset.moneyFormat || "{{amount}}";
  var currencyCode = cartRoot.dataset.currencyCode || "USD";
  var subtotalNode = cartRoot.querySelector("[data-cart-subtotal]");
  var lineItems = cartRoot.querySelectorAll("[data-line-item]");

  if (!subtotalNode || !lineItems.length) return;

  function formatWithDelimiters(number, precision, thousands, decimal) {
    var value = (number / 100).toFixed(precision);
    var parts = value.split(".");
    var dollarsAmount = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1" + thousands
    );
    var centsAmount = parts[1] ? decimal + parts[1] : "";
    return dollarsAmount + centsAmount;
  }

  function formatMoney(cents) {
    var format = moneyFormat;
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var match = format.match(placeholderRegex);
    var placeholder = match ? match[1] : "amount";
    var value = "";

    if (placeholder === "amount") {
      value = formatWithDelimiters(cents, 2, ",", ".");
    } else if (placeholder === "amount_no_decimals") {
      value = formatWithDelimiters(cents, 0, ",", ".");
    } else if (placeholder === "amount_with_comma_separator") {
      value = formatWithDelimiters(cents, 2, ".", ",");
    } else if (placeholder === "amount_no_decimals_with_comma_separator") {
      value = formatWithDelimiters(cents, 0, ".", ",");
    } else {
      try {
        value = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: currencyCode,
          minimumFractionDigits: 2,
        }).format(cents / 100);
      } catch (error) {
        value = formatWithDelimiters(cents, 2, ",", ".");
      }
    }

    return format.replace(placeholderRegex, value);
  }

  function normalizedQuantity(input) {
    var qty = parseInt(input.value, 10);
    if (isNaN(qty) || qty < 0) qty = 0;
    input.value = qty;
    return qty;
  }

  function recalc() {
    var subtotalCents = 0;

    lineItems.forEach(function (item) {
      var unitPrice = parseInt(item.dataset.unitPrice || "0", 10);
      var originalUnitPrice = parseInt(
        item.dataset.originalUnitPrice || String(unitPrice),
        10
      );
      var qtyInput = item.querySelector("[data-quantity-input]");
      var linePriceNode = item.querySelector("[data-line-price]");
      var lineCompareNode = item.querySelector("[data-line-compare-price]");

      if (!qtyInput || !linePriceNode) return;

      var qty = normalizedQuantity(qtyInput);
      var lineCents = unitPrice * qty;
      subtotalCents += lineCents;

      linePriceNode.textContent = formatMoney(lineCents);

      if (lineCompareNode) {
        var compareCents = originalUnitPrice * qty;
        if (compareCents > lineCents) {
          lineCompareNode.textContent = formatMoney(compareCents);
          lineCompareNode.style.display = "";
        } else {
          lineCompareNode.style.display = "none";
        }
      }
    });

    subtotalNode.textContent = formatMoney(subtotalCents);
  }

  lineItems.forEach(function (item) {
    var input = item.querySelector("[data-quantity-input]");
    if (!input) return;
    input.addEventListener("input", recalc);
    input.addEventListener("change", recalc);
  });
})();
