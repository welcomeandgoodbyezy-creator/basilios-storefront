-- CreateTable
CREATE TABLE "bot_configuration" (
    "id" SERIAL NOT NULL,
    "page_id" TEXT,
    "bot_enabled" BOOLEAN NOT NULL DEFAULT true,
    "greeting" TEXT,
    "fallback_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bot_configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_entries" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    "keywords" TEXT[],
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faq_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messenger_conversations" (
    "id" SERIAL NOT NULL,
    "sender_psid" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'idle',
    "draft" JSONB,
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_activity_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messenger_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messenger_messages" (
    "id" SERIAL NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "direction" TEXT NOT NULL,
    "meta_message_id" TEXT,
    "text" TEXT NOT NULL,
    "intent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messenger_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bot_event_logs" (
    "id" SERIAL NOT NULL,
    "kind" TEXT NOT NULL,
    "detail" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bot_event_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "messenger_conversations_sender_psid_key" ON "messenger_conversations"("sender_psid");

-- CreateIndex
CREATE UNIQUE INDEX "messenger_messages_meta_message_id_key" ON "messenger_messages"("meta_message_id");

-- CreateIndex
CREATE INDEX "messenger_messages_conversation_id_idx" ON "messenger_messages"("conversation_id");

-- AddForeignKey
ALTER TABLE "messenger_messages" ADD CONSTRAINT "messenger_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "messenger_conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
