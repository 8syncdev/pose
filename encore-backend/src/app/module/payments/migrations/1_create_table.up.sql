CREATE TABLE "payments" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "amount" DECIMAL(10, 2) NOT NULL,
  "currency" VARCHAR(3) NOT NULL,
  "status" VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  "admin_id" INTEGER NOT NULL,
  "bill_number" VARCHAR(50) UNIQUE,
  "payment_method" VARCHAR(50),
  "transaction_id" VARCHAR(100),
  "notes" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_payments_user_id" ON "payments" ("user_id");
CREATE INDEX "idx_payments_status" ON "payments" ("status");
CREATE INDEX "idx_payments_created_at" ON "payments" ("created_at");
CREATE INDEX "idx_payments_admin_id" ON "payments" ("admin_id");

CREATE TABLE "payment_items" (
  "id" SERIAL PRIMARY KEY,
  "payment_id" INTEGER NOT NULL,
  "item_type" VARCHAR(50) NOT NULL,
  "item_id" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "unit_price" DECIMAL(10, 2) NOT NULL,
  "discount" DECIMAL(10, 2) DEFAULT 0,
  "total_amount" DECIMAL(10, 2) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_payment" FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") ON DELETE CASCADE
);

CREATE INDEX "idx_payment_items_payment_id" ON "payment_items" ("payment_id");
CREATE INDEX "idx_payment_items_item_type_item_id" ON "payment_items" ("item_type", "item_id");

CREATE TABLE "payment_refunds" (
  "id" SERIAL PRIMARY KEY,
  "payment_id" INTEGER NOT NULL,
  "amount" DECIMAL(10, 2) NOT NULL,
  "reason" TEXT,
  "status" VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed')),
  "refunded_at" TIMESTAMP WITH TIME ZONE,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_payment_refund" FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") ON DELETE CASCADE
);

CREATE INDEX "idx_payment_refunds_payment_id" ON "payment_refunds" ("payment_id");
CREATE INDEX "idx_payment_refunds_status" ON "payment_refunds" ("status");
