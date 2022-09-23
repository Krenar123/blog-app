# frozen_string_literal: true

FactoryGirl.define do
  factory :comment do
    content { FFaker::Lorem.paragraph }
    user
    association :commentable, factory: :post
  end
end
