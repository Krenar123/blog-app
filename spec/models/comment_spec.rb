# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:commentable).optional }
  end

  describe 'methods' do
    describe '.comment_replies' do
      let!(:user) { create(:user) }
      let!(:post) { create(:post) }
      let!(:comment) { create(:comment, :for_post, commentable: post, user: user) }
      let!(:comment_reply) { create(:comment, :comment_reply, commentable: comment, user: user) }

      it { expect(comment.comment_replies.count).to eq(1) }
    end
  end
end
