# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:comment_replies) }
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:commentable).optional }
    it { is_expected.to belong_to(:parent).optional }
  end
end
